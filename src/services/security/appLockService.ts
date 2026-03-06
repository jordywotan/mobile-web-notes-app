import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const PIN_KEY = 'app-lock-pin';
const BIOMETRIC_ENABLED_KEY = 'app-lock-biometric-enabled';
// AsyncStorage is wiped on app uninstall (even on iOS), unlike the Keychain.
// We store a marker here so we can detect a fresh install and purge stale
// Keychain data that iOS would otherwise keep across reinstalls.
const INSTALL_MARKER_KEY = 'app-lock-installed';

type LocalAuthenticationModule = {
    hasHardwareAsync: () => Promise<boolean>;
    isEnrolledAsync: () => Promise<boolean>;
    authenticateAsync: (options: {
        promptMessage?: string;
        fallbackLabel?: string;
        disableDeviceFallback?: boolean;
    }) => Promise<{ success: boolean }>;
};

let warnedMissingLocalAuth = false;

function getLocalAuthenticationModule(): LocalAuthenticationModule | null {
    try {
        return require('expo-local-authentication') as LocalAuthenticationModule;
    } catch (error) {
        if (!warnedMissingLocalAuth) {
            warnedMissingLocalAuth = true;
            console.warn(
                'expo-local-authentication is unavailable in the current native build. Biometrics are disabled until you rebuild the dev client.',
                error,
            );
        }

        return null;
    }
}

export async function clearAllLockData(): Promise<void> {
    await Promise.all([
        SecureStore.deleteItemAsync(PIN_KEY),
        SecureStore.deleteItemAsync(BIOMETRIC_ENABLED_KEY),
    ]);
}

/**
 * On iOS, Keychain entries survive app uninstalls. This function detects a
 * fresh install by checking for an AsyncStorage marker (which IS cleared on
 * uninstall) and wipes any stale Keychain data when the marker is absent.
 * Safe to call multiple times — the marker is written on first launch.
 */
export async function clearLockDataIfFreshInstall(): Promise<void> {
    try {
        const marker = await AsyncStorage.getItem(INSTALL_MARKER_KEY);
        if (!marker) {
            await clearAllLockData();
            await AsyncStorage.setItem(INSTALL_MARKER_KEY, '1');
        }
    } catch (error) {
        // Storage unavailable — not a blocker, proceed normally.
        console.warn('clearLockDataIfFreshInstall: storage check failed, skipping.', error);
    }
}

export async function getSavedPin(): Promise<string | null> {
    return SecureStore.getItemAsync(PIN_KEY);
}

export async function savePin(pin: string): Promise<void> {
    await SecureStore.setItemAsync(PIN_KEY, pin);
}

export async function isBiometricEnabled(): Promise<boolean> {
    const value = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
    return value === 'true';
}

export async function setBiometricEnabled(enabled: boolean): Promise<void> {
    await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, String(enabled));
}

export async function canUseBiometrics(): Promise<boolean> {
    const localAuth = getLocalAuthenticationModule();
    if (!localAuth) {
        return false;
    }

    const hasHardware = await localAuth.hasHardwareAsync();
    const isEnrolled = await localAuth.isEnrolledAsync();
    return hasHardware && isEnrolled;
}

export async function authenticateWithBiometrics(): Promise<boolean> {
    const localAuth = getLocalAuthenticationModule();
    if (!localAuth) {
        return false;
    }

    const result = await localAuth.authenticateAsync({
        promptMessage: 'Unlock Notes',
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
    });

    return result.success;
}

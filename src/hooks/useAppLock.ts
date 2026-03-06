import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { useAuthSession, useAuthStatus } from '@/hooks/useAuthStore';
import {
    authenticateWithBiometrics,
    canUseBiometrics,
    getSavedPin,
    isBiometricEnabled,
    savePin,
    setBiometricEnabled,
} from '@/services/security/appLockService';

type AppLockPhase = 'loading' | 'setup' | 'locked' | 'unlocked';

export function useAppLock() {
    const session = useAuthSession();
    const { isBootstrapped } = useAuthStatus();

    const [phase, setPhase] = useState<AppLockPhase>('loading');
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricEnabled, setBiometricEnabledState] = useState(false);

    const hasPinRef = useRef(false);
    const lockOnForegroundRef = useRef(false);
    const appStateRef = useRef(AppState.currentState);

    useEffect(() => {
        let isMounted = true;

        async function bootstrapLockState() {
            if (!isBootstrapped) {
                return;
            }

            if (!session) {
                hasPinRef.current = false;
                lockOnForegroundRef.current = false;
                if (isMounted) {
                    setPhase('unlocked');
                    setBiometricAvailable(false);
                    setBiometricEnabledState(false);
                }
                return;
            }

            if (isMounted) {
                setPhase('loading');
            }

            const [storedPin, available, enabled] = await Promise.all([
                getSavedPin(),
                canUseBiometrics(),
                isBiometricEnabled(),
            ]);

            hasPinRef.current = Boolean(storedPin);

            if (!isMounted) {
                return;
            }

            setBiometricAvailable(available);
            setBiometricEnabledState(enabled && available);
            setPhase(storedPin ? 'locked' : 'setup');
        }

        void bootstrapLockState();

        return () => {
            isMounted = false;
        };
    }, [isBootstrapped, session]);

    useEffect(() => {
        if (!session || !isBootstrapped) {
            return;
        }

        const subscription = AppState.addEventListener('change', (nextState) => {
            const previousState = appStateRef.current;
            appStateRef.current = nextState;

            if (
                previousState === 'active' &&
                (nextState === 'inactive' || nextState === 'background') &&
                hasPinRef.current
            ) {
                lockOnForegroundRef.current = true;
            }

            if (nextState === 'active' && lockOnForegroundRef.current && hasPinRef.current) {
                setPhase('locked');
                lockOnForegroundRef.current = false;
            }
        });

        return () => {
            subscription.remove();
        };
    }, [isBootstrapped, session]);

    const setupPin = useCallback(
        async (pin: string, enableBiometric: boolean) => {
            await savePin(pin);
            hasPinRef.current = true;

            const shouldEnableBiometric = biometricAvailable && enableBiometric;
            await setBiometricEnabled(shouldEnableBiometric);
            setBiometricEnabledState(shouldEnableBiometric);
            setPhase('unlocked');
        },
        [biometricAvailable],
    );

    const unlockWithPin = useCallback(async (pin: string) => {
        const storedPin = await getSavedPin();

        if (!storedPin || pin !== storedPin) {
            return false;
        }

        setPhase('unlocked');
        return true;
    }, []);

    const unlockWithBiometrics = useCallback(async () => {
        if (!biometricAvailable || !biometricEnabled) {
            return false;
        }

        const success = await authenticateWithBiometrics();
        if (success) {
            setPhase('unlocked');
        }

        return success;
    }, [biometricAvailable, biometricEnabled]);

    return {
        isReady: isBootstrapped,
        hasSession: Boolean(session),
        phase,
        biometricAvailable,
        biometricEnabled,
        setupPin,
        unlockWithPin,
        unlockWithBiometrics,
    };
}

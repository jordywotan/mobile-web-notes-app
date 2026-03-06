import '../global.css';

import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppSplash } from '@/components/ui/AppSplash';
import { AppLockScreen } from '@/features/security/components/AppLockScreen';
import { useAppLock } from '@/hooks/useAppLock';
import { useAuthStatus } from '@/hooks/useAuthStore';
import { AppProviders } from '@/providers/AppProviders';

SplashScreen.preventAutoHideAsync().catch(() => null);

function RootContent() {
    const { isBootstrapped } = useAuthStatus();
    const {
        biometricAvailable,
        biometricEnabled,
        hasSession,
        phase,
        setupPin,
        unlockWithBiometrics,
        unlockWithPin,
    } = useAppLock();

    useEffect(() => {
        if (!isBootstrapped) {
            return;
        }

        SplashScreen.hideAsync().catch(() => null);
    }, [isBootstrapped]);

    if (!isBootstrapped || phase === 'loading') {
        return <AppSplash />;
    }

    if (hasSession && (phase === 'setup' || phase === 'locked')) {
        return (
            <AppLockScreen
                biometricAvailable={biometricAvailable}
                biometricEnabled={biometricEnabled}
                mode={phase === 'setup' ? 'setup' : 'unlock'}
                onSetupPin={setupPin}
                onUnlockWithBiometrics={unlockWithBiometrics}
                onUnlockWithPin={unlockWithPin}
            />
        );
    }

    return <Slot />;
}

export default function RootLayout() {
    return (
        <AppProviders>
            <RootContent />
        </AppProviders>
    );
}

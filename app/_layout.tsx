import '../global.css';

import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppSplash } from '@/components/ui/AppSplash';
import { useAuthStatus } from '@/hooks/useAuthStore';
import { AppProviders } from '@/providers/AppProviders';

SplashScreen.preventAutoHideAsync().catch(() => null);

function RootContent() {
    const { isBootstrapped } = useAuthStatus();

    useEffect(() => {
        if (!isBootstrapped) {
            return;
        }

        SplashScreen.hideAsync().catch(() => null);
    }, [isBootstrapped]);

    if (!isBootstrapped) {
        return <AppSplash />;
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

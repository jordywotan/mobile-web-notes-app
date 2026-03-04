import { Redirect, Stack } from 'expo-router';

import { useAuthSession, useAuthStatus } from '@/hooks/useAuthStore';

export default function AuthLayout() {
    const session = useAuthSession();
    const { isBootstrapped } = useAuthStatus();

    if (!isBootstrapped) {
        return null;
    }

    if (session) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'none',
            }}
        />
    );
}

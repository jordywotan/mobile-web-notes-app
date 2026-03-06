import { Redirect, Tabs } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';

import { useAuthSession, useAuthStatus } from '@/hooks/useAuthStore';

export default function TabsLayout() {
    const session = useAuthSession();
    const { isBootstrapped } = useAuthStatus();

    if (!isBootstrapped) {
        return null;
    }

    if (!session) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{ title: 'Home' }}
                listeners={{
                    focus: () => {
                        setStatusBarStyle('dark');
                    },
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{ title: 'Settings' }}
                listeners={{
                    focus: () => {
                        setStatusBarStyle('light');
                    },
                }}
            />
        </Tabs>
    );
}

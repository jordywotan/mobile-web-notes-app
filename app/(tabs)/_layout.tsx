import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

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
                        StatusBar.setBarStyle('dark-content', true);
                    },
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{ title: 'Settings' }}
                listeners={{
                    focus: () => {
                        StatusBar.setBarStyle('light-content', true);
                    },
                }}
            />
        </Tabs>
    );
}

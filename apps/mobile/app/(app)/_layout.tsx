import HeaderLeft from '@/components/ui/header/headerLeft';
import HeaderRight from '@/components/ui/header/headerRight';
import { Stack } from 'expo-router';

const AppLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: 'transparent' },
                contentStyle: { backgroundColor: 'transparent' },

                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="(dashboard)" />
        </Stack>
    );
};
export default AppLayout;

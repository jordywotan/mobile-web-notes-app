import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBrand } from '@/components/ui/AppBrand';

type AuthHeaderProps = {
    title: string;
    subtitle: string;
    appName?: string;
};

export function AuthHeader({ title, subtitle, appName = 'Quick Notes App' }: AuthHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#0b0859', '#3e4297']}
            end={{ x: 0.5, y: 1 }}
            start={{ x: 0.5, y: 0 }}
            style={{
                width: '100%',
                paddingHorizontal: 24,
                paddingTop: insets.top + 24,
                paddingBottom: 32,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                marginBottom: 48,
            }}
        >
            <AppBrand appName={appName} containerClassName="mb-xl" textClassName="text-white/90" />

            <Text className="mb-sm font-display text-4xl font-bold text-white">{title}</Text>
            <Text className="font-display text-lg leading-8 text-white/80">{subtitle}</Text>
        </LinearGradient>
    );
}

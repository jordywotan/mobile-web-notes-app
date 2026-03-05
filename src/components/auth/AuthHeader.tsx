import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
            <View className="mb-xl flex-row items-center justify-center gap-7">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                    <Image
                        className="h-6 w-6"
                        resizeMode="contain"
                        source={require('../../../assets/icon.png')}
                    />
                </View>
                <Text className="text-center font-display text-xl tracking-[3px] text-white/90">
                    {appName}
                </Text>
            </View>

            <Text className="mb-sm font-display text-4xl font-bold text-white">{title}</Text>
            <Text className="font-display text-lg leading-8 text-white/80">{subtitle}</Text>
        </LinearGradient>
    );
}

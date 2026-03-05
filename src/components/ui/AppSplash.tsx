import { ActivityIndicator, Image, Text, useColorScheme, View } from 'react-native';

export function AppSplash() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const logoSource = isDark
        ? require('../../../assets/splash/splash-logo-dark.png')
        : require('../../../assets/splash/splash-logo-light.png');

    return (
        <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}
        >
            <Image className="mb-md h-20 w-20" resizeMode="contain" source={logoSource} />
            <Text
                className="mb-sm text-lg font-semibold"
                style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            >
                Quick Notes App
            </Text>
            <ActivityIndicator color="#2f6fed" size="small" />
        </View>
    );
}

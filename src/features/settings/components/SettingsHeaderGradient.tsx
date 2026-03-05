import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

type SettingsHeaderGradientProps = {
    topInset: number;
};

export function SettingsHeaderGradient({ topInset }: SettingsHeaderGradientProps) {
    return (
        <LinearGradient
            colors={['#0b0859', '#3e4297']}
            end={{ x: 0.5, y: 1 }}
            start={{ x: 0.5, y: 0 }}
            style={{
                width: '100%',
                paddingHorizontal: 24,
                paddingTop: topInset + 24,
                paddingBottom: 32,
            }}
        >
            <View className="h-20 items-center justify-center pb-10">
                <Text className="font-display text-2xl font-semibold text-white">Settings</Text>
            </View>
        </LinearGradient>
    );
}

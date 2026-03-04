import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

type SettingsHeaderProps = {
    topInset: number;
};

export function SettingsHeader({ topInset }: SettingsHeaderProps) {
    return (
        <View>
            <LinearGradient
                colors={['#0b0859', '#3e4297']}
                end={{ x: 0.5, y: 1 }}
                start={{ x: 0.5, y: 0 }}
                style={{
                    width: '100%',
                    paddingHorizontal: 24,
                    paddingTop: topInset + 24,
                    paddingBottom: 32,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    zIndex: 0,
                }}
            >
                <View className="h-20 items-center justify-center pb-10">
                    <Text className="font-display text-2xl font-semibold text-white">Settings</Text>
                </View>
            </LinearGradient>

            <View className="absolute bottom-0 left-1/2 z-50 -mb-14 -translate-x-1/2 items-center">
                <View className="border-surface bg-surface h-28 w-28 items-center justify-center rounded-full border-4 shadow-sm">
                    <View className="h-24 w-24 items-center justify-center rounded-full bg-[#375B6A]">
                        <Ionicons color="#E7EFF3" name="person" size={46} />
                    </View>
                </View>
            </View>
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';

type SettingsAvatarBadgeProps = {
    avatarUri: string | null;
};

export function SettingsAvatarBadge({ avatarUri }: SettingsAvatarBadgeProps) {
    return (
        <View className="absolute bottom-0 left-1/2 z-50 -mb-14 -translate-x-1/2 items-center">
            <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-surface bg-surface shadow-sm">
                {avatarUri ? (
                    <Image
                        className="h-24 w-24 rounded-full"
                        resizeMode="cover"
                        source={{ uri: avatarUri }}
                    />
                ) : (
                    <View className="h-24 w-24 items-center justify-center rounded-full bg-[#375B6A]">
                        <Ionicons color="#E7EFF3" name="person" size={46} />
                    </View>
                )}
            </View>
        </View>
    );
}

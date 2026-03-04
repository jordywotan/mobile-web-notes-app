import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

type SettingsRowProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value?: string;
    onPress?: () => void;
    isLast?: boolean;
    rightAdornment?: ReactNode;
};

export function SettingsRow({
    icon,
    title,
    value,
    onPress,
    isLast = false,
    rightAdornment,
}: SettingsRowProps) {
    return (
        <Pressable
            className={`flex-row items-center px-lg py-md ${isLast ? '' : 'border-b border-slate-200'}`.trim()}
            disabled={!onPress}
            onPress={onPress}
        >
            <Ionicons color="#2f3273" name={icon} size={22} />
            <Text className="text-ink ml-md flex-1 font-display text-3xl font-medium">{title}</Text>

            {rightAdornment ??
                (value ? (
                    <View className="flex-row items-center">
                        <Text className="text-ink/45 mr-sm text-2xl">{value}</Text>
                        <Ionicons color="#3e4297" name="chevron-forward" size={18} />
                    </View>
                ) : (
                    <Ionicons color="#3e4297" name="chevron-forward" size={18} />
                ))}
        </Pressable>
    );
}

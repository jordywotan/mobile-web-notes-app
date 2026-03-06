import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';

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
    const isDark = useColorScheme() === 'dark';
    const iconColor = isDark ? '#a5b4fc' : '#2f3273';
    const chevronColor = isDark ? '#a5b4fc' : '#3e4297';

    return (
        <Pressable
            className={`flex-row items-center px-lg py-md ${isLast ? '' : 'border-b border-slate-200'}`.trim()}
            disabled={!onPress}
            onPress={onPress}
        >
            <Ionicons color={iconColor} name={icon} size={22} />
            <Text className="ml-md flex-1 font-display text-sm font-medium text-ink">{title}</Text>

            {rightAdornment ??
                (value ? (
                    <View className="flex-row items-center">
                        <Text className="mr-sm text-sm text-ink">{value}</Text>
                        <Ionicons color={chevronColor} name="chevron-forward" size={18} />
                    </View>
                ) : (
                    <Ionicons color={chevronColor} name="chevron-forward" size={18} />
                ))}
        </Pressable>
    );
}

import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type SettingsSectionProps = PropsWithChildren<{
    title: string;
}>;

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <>
            <Text className="text-ink/30 mb-sm mt-lg px-lg text-sm font-semibold tracking-[3px]">
                {title}
            </Text>
            <View className="bg-surface mx-lg overflow-hidden rounded-xl">{children}</View>
        </>
    );
}

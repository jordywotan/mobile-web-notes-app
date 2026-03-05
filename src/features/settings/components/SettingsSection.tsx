import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type SettingsSectionProps = PropsWithChildren<{
    title: string;
}>;

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <>
            <Text className="mb-sm mt-lg px-lg text-sm font-semibold tracking-[3px] text-ink/30">
                {title}
            </Text>
            <View className="mx-lg overflow-hidden rounded-xl bg-surface">{children}</View>
        </>
    );
}

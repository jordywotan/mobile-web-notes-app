import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { AppBrand } from '@/components/ui/AppBrand';

type AppLockLayoutProps = PropsWithChildren<{
    title: string;
    subtitle?: string;
}>;

export function AppLockLayout({ children, title, subtitle }: AppLockLayoutProps) {
    return (
        <View className="flex-1 items-center justify-center bg-background-light px-lg dark:bg-background-dark">
            <View className="w-full max-w-md rounded-xl bg-surface p-lg dark:bg-deep">
                <AppBrand
                    containerClassName="mb-lg"
                    textClassName="text-ink/90 dark:text-surface/90"
                />

                <Text className="mb-sm text-center font-display text-2xl font-semibold text-ink dark:text-surface">
                    {title}
                </Text>
                {subtitle ? (
                    <Text className="mb-lg text-center text-sm text-ink/70 dark:text-surface/70">
                        {subtitle}
                    </Text>
                ) : null}

                {children}
            </View>
        </View>
    );
}

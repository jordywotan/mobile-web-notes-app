import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';

type AppTextProps = PropsWithChildren<{
    className?: string;
}>;

export function AppText({ children, className }: AppTextProps) {
    return (
        <Text className={`text-base text-neutral-900 ${className ?? ''}`.trim()}>{children}</Text>
    );
}

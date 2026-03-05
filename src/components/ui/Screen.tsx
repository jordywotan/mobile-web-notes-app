import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

type ScreenProps = PropsWithChildren<{
    className?: string;
}>;

export function Screen({ children, className }: ScreenProps) {
    return <View className={`flex-1 bg-neutral-50 ${className ?? ''}`.trim()}>{children}</View>;
}

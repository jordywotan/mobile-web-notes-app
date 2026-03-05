import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const cardStyles = tv({
    base: 'w-full rounded-xl p-lg',
    variants: {
        variant: {
            elevated: 'bg-surface dark:bg-deep',
            subtle: 'bg-surface/80 dark:bg-deep/85',
            outline: 'border border-ink/10 bg-transparent dark:border-surface/10',
        },
    },
    defaultVariants: {
        variant: 'elevated',
    },
});

type CardProps = PropsWithChildren<
    ViewProps &
        VariantProps<typeof cardStyles> & {
            className?: string;
        }
>;

export function Card({ children, variant, className, ...props }: CardProps) {
    return (
        <View className={`${cardStyles({ variant })} ${className ?? ''}`.trim()} {...props}>
            {children}
        </View>
    );
}

import type { ReactNode } from 'react';
import type { PressableProps, TextProps } from 'react-native';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonStyles = tv({
    base: 'w-full items-center justify-center rounded-lg',
    variants: {
        variant: {
            primary: 'bg-ink',
            accent: 'bg-accent',
            outline: 'border-ink/20 dark:border-surface/20 border bg-transparent',
            ghost: 'bg-transparent',
        },
        size: {
            md: 'px-md py-sm',
            lg: 'px-lg py-md',
        },
        disabled: {
            true: 'opacity-60',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'lg',
    },
});

const buttonTextStyles = tv({
    base: 'font-display text-base font-semibold',
    variants: {
        variant: {
            primary: 'text-surface',
            accent: 'text-surface',
            outline: 'text-ink dark:text-surface',
            ghost: 'text-ink dark:text-surface',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonProps = Omit<PressableProps, 'children'> &
    ButtonVariants & {
        label: string;
        loading?: boolean;
        leftIcon?: ReactNode;
        textProps?: TextProps;
        className?: string;
        textClassName?: string;
    };

export function Button({
    label,
    loading = false,
    disabled,
    variant,
    size,
    leftIcon,
    textProps,
    className,
    textClassName,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            accessibilityRole="button"
            disabled={isDisabled}
            className={`${buttonStyles({ variant, size, disabled: isDisabled })} ${className ?? ''}`.trim()}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? '#0b0859' : '#fefcfc'}
                />
            ) : (
                <>
                    {leftIcon}
                    <Text
                        {...textProps}
                        className={`${buttonTextStyles({ variant })} ${textClassName ?? ''}`.trim()}
                    >
                        {label}
                    </Text>
                </>
            )}
        </Pressable>
    );
}

import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import { Text, TextInput, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const wrapperStyles = tv({
    base: 'w-full',
});

const labelRowStyles = tv({
    base: 'mb-xs flex-row items-center justify-between',
});

const labelStyles = tv({
    base: 'ml-1 text-sm font-semibold text-ink dark:text-surface',
});

const inputContainerStyles = tv({
    base: 'form-input ios-shadow flex h-14 w-full justify-center rounded-lg border border-slate-200 bg-white px-4 text-base transition-all focus:border-accent focus:ring-1 focus:ring-accent/20 dark:border-slate-800 dark:bg-slate-900/50',
    variants: {
        invalid: {
            true: 'border-danger',
            false: '',
        },
    },
    defaultVariants: {
        invalid: false,
    },
});

const inputStyles = tv({
    base: 'flex-1 py-sm font-display text-base text-ink dark:text-surface',
});

type TextFieldProps = Omit<TextInputProps, 'className'> &
    VariantProps<typeof inputContainerStyles> & {
        label?: string;
        rightLabel?: string;
        rightLabelColorClassName?: string;
        rightAccessory?: ReactNode;
        error?: string;
        containerClassName?: string;
        inputContainerClassName?: string;
        inputClassName?: string;
    };

export function TextField({
    label,
    rightLabel,
    rightLabelColorClassName,
    rightAccessory,
    error,
    invalid,
    containerClassName,
    inputContainerClassName,
    inputClassName,
    placeholderTextColor = '#7b7280',
    ...props
}: TextFieldProps) {
    const hasError = invalid ?? Boolean(error);

    return (
        <View className={`${wrapperStyles()} ${containerClassName ?? ''}`.trim()}>
            {(label || rightLabel) && (
                <View className={labelRowStyles()}>
                    <Text className={labelStyles()}>{label}</Text>
                    {rightLabel ? (
                        <Text
                            className={`text-sm font-medium ${rightLabelColorClassName ?? 'text-accent'}`}
                        >
                            {rightLabel}
                        </Text>
                    ) : null}
                </View>
            )}

            <View
                className={`${inputContainerStyles({ invalid: hasError })} ${inputContainerClassName ?? ''}`.trim()}
            >
                <TextInput
                    {...props}
                    className={`${inputStyles()} ${inputClassName ?? ''}`.trim()}
                    placeholderTextColor={placeholderTextColor}
                />
                {rightAccessory}
            </View>

            {error ? (
                <Text className="mb-sm mt-xs text-sm text-danger">{error}</Text>
            ) : (
                <View className="mb-sm" />
            )}
        </View>
    );
}

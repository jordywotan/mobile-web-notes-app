import { useEffect, useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';

type PinDotsInputProps = {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

const PIN_LENGTH = 4;

export function PinDotsInput({ value, onChange, disabled = false }: PinDotsInputProps) {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (disabled) {
            return;
        }

        let mounted = true;

        const timeout = setTimeout(() => {
            if (mounted) {
                inputRef.current?.focus();
            }
        }, 0);

        return () => {
            mounted = false;
            clearTimeout(timeout);
        };
    }, [disabled]);

    function refocus() {
        if (disabled || !inputRef.current) {
            return;
        }

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }

    return (
        <Pressable className="mb-md items-center" onPress={refocus}>
            <TextInput
                ref={inputRef}
                autoCorrect={false}
                caretHidden
                keyboardType="number-pad"
                maxLength={PIN_LENGTH}
                onBlur={refocus}
                onChangeText={(nextValue) => {
                    const sanitized = nextValue.replace(/\D/g, '').slice(0, PIN_LENGTH);
                    onChange(sanitized);
                }}
                style={{ opacity: 0, position: 'absolute', width: 1, height: 1 }}
                value={value}
            />

            <View className="flex-row items-center justify-center gap-3">
                {Array.from({ length: PIN_LENGTH }).map((_, index) => {
                    const isFilled = index < value.length;

                    return (
                        <View
                            key={index}
                            className={`h-4 w-4 rounded-full border ${
                                isFilled
                                    ? 'border-accent bg-accent'
                                    : 'border-slate-300 bg-transparent dark:border-slate-500'
                            }`}
                        />
                    );
                })}
            </View>
        </Pressable>
    );
}

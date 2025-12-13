import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

// We breiden TextInputProps uit met de props die we nodig hebben voor React Hook Form
interface FormInputProps<T extends FieldValues> extends TextInputProps {
    /**
     * Het 'control' object van de useForm hook.
     */
    control: Control<T>;
    /**
     * De unieke naam van dit veld in het formulier.
     */
    name: Path<T>;
    /**
     * De tekst voor het label. Essentieel voor toegankelijkheid.
     */
    label: string;
    /**
     * Optionele validatieregels voor dit veld.
     */
    rules?: Omit<RegisterOptions<T, Path<T>>, 'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'>;
}

const FormInput = <T extends FieldValues>({ control, name, label, rules, ...props }: FormInputProps<T>) => {
    const nativeID = `${name}-label`;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="mb-4">
                    <Text
                        nativeID={nativeID} // Geef het label een ID
                        className="mb-2 font-medium text-base text-text-dark"
                    >
                        {label}
                    </Text>

                    <TextInput
                        accessibilityLabelledBy={nativeID}
                        aria-invalid={!!error}
                        className={`
                          w-full rounded-full border-border-light bg-background-light border-2 h-14 px-2
                          ${error ? 'border-danger' : 'border-border-light'}
                        `}
                        placeholderTextColor="#9CA3AF"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...props}
                    />

                    {error && (
                        <Text role="alert" className="mt-1 text-sm text-danger">
                            {error.message || 'Dit veld is verplicht'}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

export default FormInput;

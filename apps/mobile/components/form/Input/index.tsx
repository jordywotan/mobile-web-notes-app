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
    // Genereer een unieke ID voor de a11y-koppeling tussen label en input
    const nativeID = `${name}-label`;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="mb-4">
                    {/* A11Y Stap 1: Een expliciet label */}
                    <Text
                        nativeID={nativeID} // Geef het label een ID
                        className="mb-2 font-medium text-base text-text-light dark:text-text-dark"
                    >
                        {label}
                    </Text>

                    <TextInput
                        // A11Y Stap 2: Koppel de input aan het label
                        accessibilityLabelledBy={nativeID}
                        // A11Y Stap 3: Geef aan of het veld een fout bevat
                        aria-invalid={!!error}
                        className={`
                          w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark border-2 h-12 px-2
                          ${error ? 'border-danger' : 'border-border-light dark:border-border-dark'}
                        `}
                        placeholderTextColor="#9CA3AF" // Standaard placeholder kleur
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...props} // Spreid de overige props (placeholder, keyboardType, etc.)
                    />

                    {/* A11Y Stap 4: Toon en kondig de foutmelding aan */}
                    {error && (
                        <Text
                            role="alert" // Vertelt screen readers om deze tekst direct aan te kondigen
                            className="mt-1 text-sm text-danger"
                        >
                            {error.message || 'Dit veld is verplicht'}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

export default FormInput;

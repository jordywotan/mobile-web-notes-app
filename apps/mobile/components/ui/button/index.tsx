import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';

interface ButtonProps extends PressableProps {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

const Button = ({ children, className = '', isLoading = false, disabled, ...props }: ButtonProps) => {
    // De styling van de container (Pressable)
    // NativeWind vertaalt 'hover:' en 'focus:' naar 'active:' op het web.
    // De 'pressed:' variant werkt perfect op mobiel.
    const containerClasses = `
    flex-row w-full items-center justify-center gap-2 rounded-lg h-12
    bg-primary
    text-sm font-bold
    pressed:bg-primary/90
    disabled:bg-gray-400 disabled:opacity-70
  `;

    // De styling voor de tekst binnen de knop
    const textClasses = 'text-white text-base font-bold';

    return (
        <Pressable
            // A11Y: Zorg ervoor dat de knop niet kan worden ingedrukt tijdens het laden of als hij disabled is
            disabled={isLoading || disabled}
            // A11Y: Geef de juiste rol door aan screen readers
            accessibilityRole="button"
            // A11Y: Communiceer de 'disabled' en 'busy' (loading) statussen
            accessibilityState={{ disabled: !!(isLoading || disabled), busy: isLoading }}
            className={`${containerClasses} ${className}`}
            {...props}
        >
            {isLoading ? (
                // Toon een laadindicator
                <ActivityIndicator size="small" color="white" />
            ) : (
                // Toon de inhoud van de knop
                <Text className={textClasses}>{children}</Text>
            )}
        </Pressable>
    );
};

export default Button;

// apps/mobile/components/Card.tsx

import React from 'react';
import { View, Pressable, ViewProps, PressableProps } from 'react-native';

type CombinedStyle = ViewProps['style'] | PressableProps['style'];

interface CardProps extends Omit<ViewProps, 'style'>, Omit<PressableProps, 'style'> {
    children: React.ReactNode;
    className?: string;
    style?: CombinedStyle;
}

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`pb-4 border-b border-border-light dark:border-border-dark ${className}`}>{children}</View>
);

const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`py-4 ${className}`}>{children}</View>
);

const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`pt-4 border-t border-border-light dark:border-border-dark ${className}`}>{children}</View>
);

const Card = ({ children, className = '', onPress, ...props }: CardProps) => {
    // Bepaal of we een statische View of een interactieve Pressable moeten renderen
    const Component = onPress ? Pressable : View;

    // De basis styling die u heeft opgegeven
    const baseClasses = 'bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark';

    // Voeg padding alleen toe als we GEEN sub-componenten gebruiken (detectie is lastig, dus we maken een variant zonder padding)
    // De standaard padding is p-6
    const paddingClass = 'p-6';

    const combinedClassName = [baseClasses, paddingClass, className].join(' ');

    return (
        <Component
            // A11Y: Als de kaart tappable is, geef het de rol van een knop.
            accessibilityRole={onPress ? 'button' : undefined}
            className={combinedClassName}
            {...props}
        >
            {children}
        </Component>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

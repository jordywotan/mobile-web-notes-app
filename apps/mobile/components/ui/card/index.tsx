import React from 'react';
import { View, Pressable, ViewProps, PressableProps } from 'react-native';

type CombinedStyle = ViewProps['style'] | PressableProps['style'];

interface CardProps extends Omit<ViewProps, 'style'>, Omit<PressableProps, 'style'> {
    children: React.ReactNode;
    className?: string;
    style?: CombinedStyle;
}

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`pb-4 border-b border-border-light ${className}`}>{children}</View>
);

const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`py-4 ${className}`}>{children}</View>
);

const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`pt-4 border-t border-border-light ${className}`}>{children}</View>
);

const Card = ({ children, className = '', onPress, ...props }: CardProps) => {
    const Component = onPress ? Pressable : View;

    const baseClasses = 'bg-card-light rounded-xl border border-border-light';

    const combinedClassName = [baseClasses, className].join(' ');

    return (
        <Component accessibilityRole={onPress ? 'button' : undefined} className={combinedClassName} {...props}>
            {children}
        </Component>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

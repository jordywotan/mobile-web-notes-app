import React from 'react';
import { Text, TextProps } from 'react-native';

interface ParagraphProps extends TextProps {
    children: React.ReactNode;
    size?: 'sm' | 'base' | 'lg';
    className?: string;
}

const Paragraph = ({ size = 'base', children, className = '', ...props }: ParagraphProps) => {
    const baseClasses = 'text-text-light dark:text-text-dark';

    const sizeClasses = {
        sm: 'text-base leading-relaxed', // 14px font, 20px line height
        base: 'text-lg leading-relaxed', // 16px font, 26px line height
        lg: 'text-xl leading-relaxed', // 18px font, 28px line height
    };

    const combinedClassName = [baseClasses, sizeClasses[size], className].join(' ');

    return (
        <Text selectable={true} className={combinedClassName} {...props}>
            {children}
        </Text>
    );
};

export default Paragraph;

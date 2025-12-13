import { Text, TextProps } from 'react-native';

interface HeadingProps extends TextProps {
    level: 1 | 2 | 3;
    children: React.ReactNode;
    className?: string;
}

const Heading = ({ level, children, className = '', ...props }: HeadingProps) => {
    const baseClasses = 'text-text-dark tracking-dark font-bold leading-tight';

    const sizeClasses = {
        1: 'text-[32px]',
        2: 'text-[28px]',
        3: 'text-2xl',
    };

    const combinedClassName = [baseClasses, sizeClasses[level], className].join(' ');

    return (
        <Text accessibilityRole="header" aria-level={level} className={combinedClassName} {...props}>
            {children}
        </Text>
    );
};

export default Heading;

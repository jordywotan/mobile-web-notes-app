import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';
import { Text } from 'react-native';

// Combineer de props van Expo's Link en onze eigen props voor sterke typering
interface LinkProps extends ExpoLinkProps {
    children: React.ReactNode;
    className?: string;
}

const Link = ({ className = '', children, ...props }: LinkProps) => {
    // De hover-pseudo-klasse wordt hier door NativeWind genegeerd, wat perfect is.
    const textClasses = 'font-medium text-primary underline';

    return (
        // 'asChild' geeft de navigatie-eigenschappen door aan de <Text> component,
        // in plaats van een extra <Pressable> te renderen.
        <ExpoLink asChild {...props}>
            <Text className={`${textClasses} ${className}`}>{children}</Text>
        </ExpoLink>
    );
};

export default Link;

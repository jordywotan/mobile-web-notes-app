import { useAuth } from '@/context/providers/AuthProvider';
import { ActivityIndicator, View } from 'react-native';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return children;
};

export default AuthGate;

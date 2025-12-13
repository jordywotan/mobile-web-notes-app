import Button from '@/components/ui/button';
import { useAuth } from '@/context/providers/AuthProvider';
import { Text, View } from 'react-native';

const HeaderRight = () => {
    const { logout } = useAuth();

    return (
        <View className="w-11">
            <Button onPress={logout}>R</Button>
        </View>
    );
};

export default HeaderRight;

import Button from '@/components/ui/button';
import { useAuth } from '@/context/providers/AuthProvider';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
    const { logout } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <View className="flex-1 ">
                <Text className="text-2xl">BOEIE!</Text>
                <Button onPress={logout} children="Uitloggen" />
            </View>
        </SafeAreaView>
    );
};

export default Index;

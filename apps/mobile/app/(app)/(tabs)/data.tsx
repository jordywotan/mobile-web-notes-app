import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DataScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <View className="flex-1">
                <Text>Heading 1</Text>
            </View>
        </SafeAreaView>
    );
};
export default DataScreen;

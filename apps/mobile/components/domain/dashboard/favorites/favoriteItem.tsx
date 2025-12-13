import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type FavoriteItemProps = {
    label: string;
};

const FavoriteItem = ({ label }: FavoriteItemProps) => {
    return (
        <View className="flex flex-row items-center gap-4 rounded-xl bg-[#F8F9FA] p-4 shadow-md">
            <MaterialIcons name="star" size={20} color="#FBBF24" />
            <Text className="flex-1 text-lg font-medium text-[#212529]">{label}</Text>
        </View>
    );
};

export default FavoriteItem;

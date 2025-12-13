import FavoriteItem from '@/components/domain/dashboard/favorites/favoriteItem';
import { View, Text } from 'react-native';

const FavoritesList = () => {
    return (
        <View>
            <Text className="px-4 pb-3 pt-6 text-xl font-bold text-white">Favorieten</Text>

            <View className="flex flex-col gap-3 px-4">
                <FavoriteItem label="Boodschappenlijst" />
                <FavoriteItem label="Boekideeën voor 2024" />
                <FavoriteItem label="Belangrijke Wachtwoorden" />
            </View>
        </View>
    );
};

export default FavoritesList;

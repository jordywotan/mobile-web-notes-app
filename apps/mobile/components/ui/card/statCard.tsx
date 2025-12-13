import { View, Text } from 'react-native';

type StatCardProps = {
    label: string;
    value: number | string;
};

const StatCard = ({ label, value }: StatCardProps) => {
    return (
        <View className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl border border-white/20 bg-white/10 p-4">
            <Text className="text-base font-medium text-white/90">{label}</Text>
            <Text className="text-3xl font-bold text-white">{value}</Text>
        </View>
    );
};

export default StatCard;

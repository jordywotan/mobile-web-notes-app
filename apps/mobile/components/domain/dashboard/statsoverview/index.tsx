import StatCard from '@/components/ui/card/statCard';
import { View } from 'react-native';

type Stat = {
    label: string;
    value: number | string;
};

type StatsOverviewProps = {
    stats: Stat[];
};

const StatsOverview = ({ stats }: StatsOverviewProps) => {
    return (
        <View className="flex flex-row flex-wrap gap-4 p-4">
            {stats.map((stat, index) => (
                <StatCard key={index} label={stat.label} value={stat.value} />
            ))}
        </View>
    );
};

export default StatsOverview;

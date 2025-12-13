import Card from '@/components/ui/card';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

type RecentNoteCardProps = {
    title: string;
    preview: string;
    date: string;
};

const RecentNoteCard = ({ title, preview, date }: RecentNoteCardProps) => {
    return (
        <Link className="w-40 h-full" href="/data">
            <Card className="p-3 h-full">
                <Text className="text-lg font-semibold text-[#212529]">{title}</Text>

                <Text numberOfLines={1} className="text-base leading-relaxed font-normal text-gray-600">
                    {preview}
                </Text>

                <Text className="mt-auto pt-2 text-sm text-gray-400">{date}</Text>
            </Card>
        </Link>
    );
};

export default RecentNoteCard;

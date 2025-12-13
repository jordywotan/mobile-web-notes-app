import RecentNoteCard from '@/components/domain/dashboard/recent-notes/recent-notes-card';
import { View, Text, ScrollView } from 'react-native';

const RecentNotes = () => {
    return (
        <View>
            <Text className="px-4 pb-2 pt-4 text-xl font-bold text-white">Recente Notities</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 gap-4 h-40">
                <RecentNoteCard
                    title="Design Project Ideas"
                    preview="Een verzameling van gedachten en inspiratie voor..."
                    date="Gisteren"
                />
                <RecentNoteCard
                    title="Weekly Team Sync"
                    preview="Belangrijke punten van de vergadering van maandag..."
                    date="12 apr"
                />
                <RecentNoteCard
                    title="Reis naar Amsterdam"
                    preview="Vergeet niet de museumtickets te boeken en..."
                    date="9 apr"
                />
                <RecentNoteCard
                    title="React Snippets"
                    preview="Handige code voor de nieuwe component..."
                    date="5 apr"
                />
            </ScrollView>
        </View>
    );
};

export default RecentNotes;

import Announcement from '@/components/domain/dashboard/announcement';
import FavoritesList from '@/components/domain/dashboard/favorites';
import RecentNotes from '@/components/domain/dashboard/recent-notes';
import StatsOverview from '@/components/domain/dashboard/statsoverview';
import Button from '@/components/ui/button';
import { useAuth } from '@/context/providers/AuthProvider';
import { ScrollView } from 'react-native';

const Index = () => {
    const { logout } = useAuth();

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-transparent">
            <Announcement />

            <StatsOverview
                stats={[
                    { label: 'Totaal', value: 34 },
                    { label: 'Favorieten', value: 5 },
                    { label: 'Mappen', value: 8 },
                ]}
            />

            <RecentNotes />

            <FavoritesList />

            <Button className="mt-6" onPress={logout}>
                logout
            </Button>
        </ScrollView>
    );
};

export default Index;

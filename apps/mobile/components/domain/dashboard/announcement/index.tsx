import Heading from '@/components/typography/heading';
import { useAuth } from '@/context/providers/AuthProvider';
import { useDutchGreeting } from '@/hooks/useDutchGreeting';

const Announcement = () => {
    const { user } = useAuth();

    const userName = (user as { name?: string } | undefined)?.name;

    const greeting = useDutchGreeting();

    return (
        <Heading level={1} className="px-4">
            {greeting}, {userName}
        </Heading>
    );
};

export default Announcement;

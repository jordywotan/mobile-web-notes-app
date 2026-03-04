import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthContext } from '@/providers/AuthProvider';

export default function HomeScreen() {
    const { user, signOut } = useAuthContext();
    const userEmail = user?.email ?? 'No active user';

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background-light px-md dark:bg-background-dark">
            <Card className="max-w-md" variant="subtle">
                <Text className="text-ink dark:text-surface mb-sm font-display text-xl font-semibold">
                    App dashboard
                </Text>
                <Text className="text-ink/70 dark:text-surface/70 mb-lg text-sm">
                    When you see this screen, it means you're successfully authenticated.
                </Text>

                <Text className="text-ink/70 dark:text-surface/70 mb-md text-sm">
                    Current user: {userEmail}
                </Text>

                <Button label="Sign out" variant="primary" onPress={signOut} />
            </Card>
        </SafeAreaView>
    );
}

import { Text, View } from 'react-native';

type SettingsProfileProps = {
    name?: string;
    email?: string;
};

export function SettingsProfile({ name, email }: SettingsProfileProps) {
    if (!name && !email) {
        return null;
    }

    return (
        <View className="mb-sm mt-20 items-center px-lg">
            {name ? <Text className="font-display text-xl font-bold text-ink">{name}</Text> : null}
            {email ? <Text className="mt-xs text-sm text-ink/45">{email}</Text> : null}
        </View>
    );
}

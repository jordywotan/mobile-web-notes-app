import { Text, View } from 'react-native';

type SettingsProfileProps = {
    name?: string;
    email?: string;
};

export function SettingsProfile({ name, email }: SettingsProfileProps) {
    return (
        <View className="mb-sm mt-20 items-center px-lg">
            <Text className="text-ink font-display text-xl font-bold">{name}</Text>
            <Text className="text-ink/45 mt-xs text-sm">{email}</Text>
        </View>
    );
}

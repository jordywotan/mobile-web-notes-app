import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { SettingsHeader } from '@/features/settings/components/SettingsHeader';
import { SettingsProfile } from '@/features/settings/components/SettingsProfile';
import { SettingsRow } from '@/features/settings/components/SettingsRow';
import { SettingsSection } from '@/features/settings/components/SettingsSection';
import { useThemePreference } from '@/hooks/useUIStore';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUIStore } from '@/store/uiStore';

export default function SettingsScreen() {
    const themePreference = useThemePreference();
    const cycleTheme = useUIStore((state) => state.cycleTheme);
    const { user, signOut } = useAuthContext();
    const insets = useSafeAreaInsets();

    const appearanceLabel = themePreference === 'auto' ? 'System' : themePreference;

    return (
        <View className="flex-1 bg-background-light">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 28 }}>
                <SettingsHeader
                    displayName={user?.name ?? undefined}
                    email={user?.email ?? undefined}
                    topInset={insets.top}
                />

                <SettingsProfile email={user?.email} name={user?.name} />

                <SettingsSection title="ACCOUNT">
                    <SettingsRow icon="person" title="Personal Information" />
                    <SettingsRow icon="shield-checkmark" title="Security & Privacy" />
                    <SettingsRow icon="notifications" isLast title="Notifications" />
                </SettingsSection>

                <SettingsSection title="PREFERENCES">
                    <SettingsRow
                        icon="color-palette"
                        onPress={cycleTheme}
                        title="Appearance"
                        value={appearanceLabel}
                    />
                    <SettingsRow icon="language" title="Language" value="English" />
                    <SettingsRow
                        icon="sync"
                        isLast
                        title="Syncing Status"
                        rightAdornment={
                            <Ionicons color="#22C55E" name="checkmark-circle" size={24} />
                        }
                    />
                </SettingsSection>

                <SettingsSection title="SUPPORT">
                    <SettingsRow icon="help-circle" title="Help Center" />
                    <SettingsRow icon="information-circle" isLast title="About Quiet Notes" />
                </SettingsSection>

                <View className="mx-lg my-lg border-t border-slate-200">
                    <Button label="Sign out" variant="primary" onPress={signOut} />
                </View>

                <Text className="px-lg text-center text-xs text-ink/30">App version: 1.0.0</Text>
            </ScrollView>
        </View>
    );
}

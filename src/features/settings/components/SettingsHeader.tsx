import { View } from 'react-native';

import { SettingsAvatarBadge } from './SettingsAvatarBadge';
import { SettingsHeaderGradient } from './SettingsHeaderGradient';

import { isAppwriteConfigured } from '@/config/env';
import { appwriteAvatars } from '@/services/appwrite/appwriteClient';

type SettingsHeaderProps = {
    topInset: number;
    displayName?: string;
    email?: string;
};

export function SettingsHeader({ topInset, displayName, email }: SettingsHeaderProps) {
    const avatarSeed = displayName?.trim() || email?.trim();
    const avatarUri =
        isAppwriteConfigured && avatarSeed
            ? appwriteAvatars
                  .getInitials({
                      name: avatarSeed,
                      width: 150,
                      height: 150,
                      background: '375B6A',
                  })
                  .toString()
            : null;

    return (
        <View>
            <SettingsHeaderGradient topInset={topInset} />
            <SettingsAvatarBadge avatarUri={avatarUri} />
        </View>
    );
}

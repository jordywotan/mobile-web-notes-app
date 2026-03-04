import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Platform, StatusBar, type StatusBarStyle } from 'react-native';

type FocusStatusBarProps = {
    barStyle: StatusBarStyle;
    backgroundColor?: string;
    animated?: boolean;
};

export function FocusStatusBar({
    barStyle,
    backgroundColor,
    animated = true,
}: FocusStatusBarProps) {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(barStyle, animated);

            if (Platform.OS === 'android' && backgroundColor) {
                StatusBar.setBackgroundColor(backgroundColor, animated);
            }
        }, [animated, backgroundColor, barStyle]),
    );

    return null;
}

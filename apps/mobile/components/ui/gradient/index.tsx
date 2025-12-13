import React from 'react';
import { LinearGradient } from '@/nativewind-interop';
import { type ColorValue, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    children?: React.ReactNode;
    className?: string;
    colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
};

export function GradientBackground({
    children,
    className = '',
    colors = ['#4A00E0', '#8E2DE2'],
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
}: Props) {
    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                style={StyleSheet.absoluteFill}
                colors={colors}
                start={start}
                end={end}
                className={className}
            >
                {children}
            </LinearGradient>
        </SafeAreaView>
    );
}

import { Pressable, Text, View } from 'react-native';

type BiometricToggleProps = {
    enabled: boolean;
    onToggle: () => void;
};

export function BiometricToggle({ enabled, onToggle }: BiometricToggleProps) {
    return (
        <Pressable className="mb-md mt-xs flex-row items-center" onPress={onToggle}>
            <View
                className={`mr-sm h-5 w-5 items-center justify-center rounded border ${
                    enabled ? 'border-accent bg-accent' : 'border-slate-400'
                }`}
            >
                {enabled ? <Text className="text-xs font-semibold text-white">✓</Text> : null}
            </View>
            <Text className="text-sm text-ink dark:text-surface">Enable biometrics</Text>
        </Pressable>
    );
}

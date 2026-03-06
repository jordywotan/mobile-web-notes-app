import { Pressable, Text } from 'react-native';

import { BiometricToggle } from './BiometricToggle';
import { PinDotsInput } from './PinDotsInput';

import { Button } from '@/components/ui/Button';

type ConfirmPinStepProps = {
    confirmPin: string;
    enableBiometric: boolean;
    biometricAvailable: boolean;
    error: string | null;
    isBusy: boolean;
    onConfirmPinChange: (value: string) => void;
    onSave: () => void;
    onBack: () => void;
    onToggleBiometric: () => void;
};

export function ConfirmPinStep({
    confirmPin,
    enableBiometric,
    biometricAvailable,
    error,
    isBusy,
    onConfirmPinChange,
    onSave,
    onBack,
    onToggleBiometric,
}: ConfirmPinStepProps) {
    return (
        <>
            <PinDotsInput disabled={isBusy} onChange={onConfirmPinChange} value={confirmPin} />

            {biometricAvailable ? (
                <BiometricToggle enabled={enableBiometric} onToggle={onToggleBiometric} />
            ) : null}

            {error ? <Text className="mb-sm text-sm text-danger">{error}</Text> : null}

            <Button disabled={isBusy} label="Save PIN" loading={isBusy} onPress={onSave} />

            <Pressable className="mt-sm" onPress={onBack}>
                <Text className="text-center text-sm text-ink/65 dark:text-surface/65">Back</Text>
            </Pressable>
        </>
    );
}

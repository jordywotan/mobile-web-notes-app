import { Text } from 'react-native';

import { PinDotsInput } from './PinDotsInput';

import { Button } from '@/components/ui/Button';

type UnlockPinStepProps = {
    pin: string;
    error: string | null;
    isBusy: boolean;
    biometricAvailable: boolean;
    biometricEnabled: boolean;
    onPinChange: (value: string) => void;
    onUnlock: () => void;
    onUnlockWithBiometrics: () => void;
};

export function UnlockPinStep({
    pin,
    error,
    isBusy,
    biometricAvailable,
    biometricEnabled,
    onPinChange,
    onUnlock,
    onUnlockWithBiometrics,
}: UnlockPinStepProps) {
    return (
        <>
            <PinDotsInput disabled={isBusy} onChange={onPinChange} value={pin} />

            {error ? <Text className="mb-sm text-sm text-danger">{error}</Text> : null}

            <Button disabled={isBusy} label="Unlock" loading={isBusy} onPress={onUnlock} />

            {biometricAvailable && biometricEnabled ? (
                <Button
                    className="mt-sm"
                    disabled={isBusy}
                    label="Use biometrics"
                    onPress={onUnlockWithBiometrics}
                    variant="outline"
                />
            ) : null}
        </>
    );
}

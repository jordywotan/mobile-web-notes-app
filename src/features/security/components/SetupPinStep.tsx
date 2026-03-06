import { Text } from 'react-native';

import { PinDotsInput } from './PinDotsInput';

import { Button } from '@/components/ui/Button';

type SetupPinStepProps = {
    pin: string;
    error: string | null;
    isBusy: boolean;
    onPinChange: (value: string) => void;
    onContinue: () => void;
};

export function SetupPinStep({ pin, error, isBusy, onPinChange, onContinue }: SetupPinStepProps) {
    return (
        <>
            <PinDotsInput disabled={isBusy} onChange={onPinChange} value={pin} />

            {error ? <Text className="mb-sm text-sm text-danger">{error}</Text> : null}

            <Button disabled={isBusy} label="Continue" loading={isBusy} onPress={onContinue} />
        </>
    );
}

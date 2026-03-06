import { useState } from 'react';

import { AppLockLayout } from './AppLockLayout';
import { ConfirmPinStep } from './ConfirmPinStep';
import { SetupPinStep } from './SetupPinStep';
import { UnlockPinStep } from './UnlockPinStep';

type AppLockScreenProps = {
    mode: 'setup' | 'unlock';
    biometricAvailable: boolean;
    biometricEnabled: boolean;
    onSetupPin: (pin: string, enableBiometric: boolean) => Promise<void>;
    onUnlockWithPin: (pin: string) => Promise<boolean>;
    onUnlockWithBiometrics: () => Promise<boolean>;
};

export function AppLockScreen({
    mode,
    biometricAvailable,
    biometricEnabled,
    onSetupPin,
    onUnlockWithPin,
    onUnlockWithBiometrics,
}: AppLockScreenProps) {
    const [setupStep, setSetupStep] = useState<'create' | 'confirm'>('create');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [useBiometricAfterSetup, setUseBiometricAfterSetup] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBusy, setIsBusy] = useState(false);

    const isSetup = mode === 'setup';

    function handleCreateStepContinue() {
        if (!/^\d{4}$/.test(pin)) {
            setError('Use a PIN with exactly 4 digits.');
            return;
        }

        setError(null);
        setConfirmPin('');
        setSetupStep('confirm');
    }

    async function handleConfirmAndSave() {
        if (!/^\d{4}$/.test(confirmPin)) {
            setError('Confirm your 4-digit PIN.');
            return;
        }

        if (pin !== confirmPin) {
            setError('PIN codes do not match.');
            return;
        }

        setError(null);
        setIsBusy(true);
        try {
            await onSetupPin(pin, biometricAvailable && useBiometricAfterSetup);
            setPin('');
            setConfirmPin('');
            setSetupStep('create');
        } finally {
            setIsBusy(false);
        }
    }

    async function handleUnlock() {
        if (!/^\d{4}$/.test(pin)) {
            setError('Enter your 4-digit PIN.');
            return;
        }

        setError(null);
        setIsBusy(true);
        try {
            const success = await onUnlockWithPin(pin);
            if (!success) {
                setError('Incorrect PIN. Try again.');
            } else {
                setPin('');
            }
        } finally {
            setIsBusy(false);
        }
    }

    async function handleBiometricUnlock() {
        setError(null);
        setIsBusy(true);
        try {
            const success = await onUnlockWithBiometrics();
            if (!success) {
                setError('Biometric authentication failed.');
            }
        } finally {
            setIsBusy(false);
        }
    }

    if (isSetup && setupStep === 'create') {
        return (
            <AppLockLayout
                subtitle="Create a 4-digit PIN to protect access when your account is already logged in."
                title="Create PIN"
            >
                <SetupPinStep
                    error={error}
                    isBusy={isBusy}
                    onContinue={handleCreateStepContinue}
                    onPinChange={setPin}
                    pin={pin}
                />
            </AppLockLayout>
        );
    }

    if (isSetup && setupStep === 'confirm') {
        return (
            <AppLockLayout subtitle="Re-enter your 4-digit PIN to confirm it." title="Confirm PIN">
                <ConfirmPinStep
                    biometricAvailable={biometricAvailable}
                    confirmPin={confirmPin}
                    enableBiometric={useBiometricAfterSetup}
                    error={error}
                    isBusy={isBusy}
                    onBack={() => {
                        setError(null);
                        setSetupStep('create');
                    }}
                    onConfirmPinChange={setConfirmPin}
                    onSave={() => {
                        void handleConfirmAndSave();
                    }}
                    onToggleBiometric={() => setUseBiometricAfterSetup((current) => !current)}
                />
            </AppLockLayout>
        );
    }

    return (
        <AppLockLayout subtitle="Enter your 4-digit PIN to continue." title="Unlock app">
            <UnlockPinStep
                biometricAvailable={biometricAvailable}
                biometricEnabled={biometricEnabled}
                error={error}
                isBusy={isBusy}
                onPinChange={setPin}
                onUnlock={() => {
                    void handleUnlock();
                }}
                onUnlockWithBiometrics={() => {
                    void handleBiometricUnlock();
                }}
                pin={pin}
            />
        </AppLockLayout>
    );
}

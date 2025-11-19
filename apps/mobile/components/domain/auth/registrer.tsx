import FormInput from '@/components/form/Input';
import Link from '@/components/typography/link';
import Paragraph from '@/components/typography/paragraph';
import Button from '@/components/ui/button';
import { useAuth } from '@/context/providers/AuthProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

interface RegisterScreenProps {
    setShowScreen: (screen: 'login' | 'register') => void;
}

interface FormData {
    name: string;
    email: string;
    password: string;
}

const RegisterScreen = ({ setShowScreen }: RegisterScreenProps) => {
    const { registerAccount, login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            await registerAccount(data.name, data.email, data.password);
            // await login(data.email, data.password);
            setShowScreen('login');
        } catch (e: any) {
            setErrorMessage(e.message || 'Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {errorMessage && (
                <View role="alert">
                    <Text className="bg-red-100 text-danger my-2 text-base p-3 rounded-lg">{errorMessage}</Text>
                </View>
            )}

            <FormInput
                control={control}
                name="name"
                label="Naam"
                rules={{
                    required: 'Naam is verplicht',
                    minLength: { value: 2, message: 'Naam moet minstens 2 letters bevatten' },
                }}
            />

            <FormInput
                control={control}
                name="email"
                label="E-mailadres"
                keyboardType="email-address"
                autoCapitalize="none"
                rules={{
                    required: 'E-mailadres is verplicht',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Voer een geldig e-mailadres in',
                    },
                }}
            />

            <FormInput
                control={control}
                name="password"
                label="Wachtwoord"
                secureTextEntry
                rules={{
                    required: 'Wachtwoord is verplicht',
                    minLength: {
                        value: 8,
                        message: 'Wachtwoord moet minimaal 8 tekens bevatten',
                    },
                }}
            />

            <Button className="mt-4 mb-4" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                {isLoading ? 'Account aanmaken...' : 'Account aanmaken'}
            </Button>

            <Paragraph size="sm" className="text-center">
                Heb je al een account?{' '}
                <Link
                    href="/"
                    onPress={(e) => {
                        e.preventDefault();
                        setShowScreen('login');
                    }}
                >
                    Log in
                </Link>
            </Paragraph>
        </>
    );
};

export default RegisterScreen;

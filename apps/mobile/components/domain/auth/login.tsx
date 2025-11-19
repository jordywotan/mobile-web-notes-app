import FormInput from '@/components/form/Input';
import Link from '@/components/typography/link';
import Paragraph from '@/components/typography/paragraph';
import Button from '@/components/ui/button';
import { useAuth } from '@/context/providers/AuthProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

interface LoginScreenProps {
    setShowScreen: (screen: 'login' | 'register') => void;
}

interface FormData {
    email: string;
    password?: string;
}

const LoginScreen = ({ setShowScreen }: LoginScreenProps) => {
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            await login(data.email, data.password!);
        } catch (e: any) {
            if (e.code === 401) {
                // Appwrite code voor 'Invalid credentials'
                setErrorMessage('Het ingevoerde e-mail of wachtwoord is onjuist.');
            } else {
                setErrorMessage('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
            }
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
                {isLoading ? 'Inloggen...' : 'Inloggen'}
            </Button>

            <Paragraph size="sm" className="text-center">
                Nog geen account?{' '}
                <Link
                    href="/"
                    onPress={(e) => {
                        e.preventDefault(); // prevent navigation
                        setShowScreen('register'); // switch screen
                    }}
                >
                    Registreer jezelf
                </Link>
            </Paragraph>
        </>
    );
};
export default LoginScreen;

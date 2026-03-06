import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuthContext } from '@/providers/AuthProvider';

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { signIn, isLoading } = useAuthContext();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await signIn(values);
        } catch {
            setError('root', { message: 'Incorrect email or password. Please try again.' });
        }
    };

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            <AuthHeader
                subtitle="Your thoughts are waiting for you in your minimalist space."
                title="Welcome"
            />

            <SafeAreaView className="flex-1" edges={['left', 'right', 'bottom']}>
                <View className="px-lg pt-lg">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                autoCapitalize="none"
                                autoCorrect={false}
                                error={errors.email?.message}
                                keyboardType="email-address"
                                label="Email Address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="name@example.com"
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must contain at least 8 characters',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={errors.password?.message}
                                label="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="Enter your password"
                                rightLabel="Forgot?"
                                secureTextEntry
                                value={value}
                            />
                        )}
                    />

                    {errors.root?.message ? (
                        <Text className="mb-sm text-sm text-danger">{errors.root.message}</Text>
                    ) : null}

                    <Button
                        className="mt-sm"
                        disabled={isLoading || isSubmitting}
                        label="Sign In"
                        loading={isLoading || isSubmitting}
                        onPress={handleSubmit((values) => {
                            void onSubmit(values);
                        })}
                    />

                    <Link asChild href="/(auth)/register">
                        <Pressable className="mt-md">
                            <Text className="text-center font-display text-base text-ink/65 dark:text-surface/65">
                                Don&apos;t have an account?{' '}
                                <Text className="font-semibold text-accent">Create one</Text>
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
}

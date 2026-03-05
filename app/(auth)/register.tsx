import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuthContext } from '@/providers/AuthProvider';

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterScreen() {
    const { signUp, isLoading } = useAuthContext();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });

    const onSubmit = async (values: RegisterFormValues) => {
        await signUp(values);
    };

    return (
        <View className="flex-1 bg-background-light dark:bg-background-dark">
            <AuthHeader
                subtitle="Start capturing your ideas in your own minimalist note space."
                title="Create account"
            />

            <SafeAreaView className="flex-1" edges={['left', 'right', 'bottom']}>
                <View className="px-lg pt-lg">
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must contain at least 2 characters',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={errors.name?.message}
                                label="Full Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                placeholder="John Doe"
                                value={value}
                            />
                        )}
                    />

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
                                placeholder="Create a secure password"
                                secureTextEntry
                                value={value}
                            />
                        )}
                    />

                    <Button
                        className="mt-sm"
                        disabled={isLoading || isSubmitting}
                        label="Create Account"
                        loading={isLoading || isSubmitting}
                        onPress={handleSubmit((values) => {
                            void onSubmit(values);
                        })}
                    />

                    <Link asChild href="/(auth)/login">
                        <Pressable className="mt-md">
                            <Text className="text-center font-display text-base text-ink/65 dark:text-surface/65">
                                Already have an account?{' '}
                                <Text className="font-semibold text-accent">Sign in</Text>
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
}

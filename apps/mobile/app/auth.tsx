import LoginScreen from '@/components/domain/auth/login';
import RegisterScreen from '@/components/domain/auth/registrer';
import Heading from '@/components/typography/heading';
import Paragraph from '@/components/typography/paragraph';
import Card from '@/components/ui/card';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AuthScreen = () => {
    const [showScreen, setShowScreen] = React.useState('login');

    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="flex-1 justify-center px-4">
                    <Heading level={1} className="text-center mb-4">
                        Takenlijst app
                    </Heading>
                    <Paragraph size="base" className="text-center mb-8">
                        {showScreen === 'login'
                            ? 'Login met je account om verder te gaan'
                            : 'Registreer jezelf om verder te gaan'}
                    </Paragraph>

                    <Card>
                        {showScreen === 'login' ? (
                            <LoginScreen setShowScreen={setShowScreen} />
                        ) : (
                            <RegisterScreen setShowScreen={setShowScreen} />
                        )}
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AuthScreen;

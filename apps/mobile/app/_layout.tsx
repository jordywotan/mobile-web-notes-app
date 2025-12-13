import AuthGate from '@/components/domain/auth/auth-gate';
import { AuthProvider, useAuth } from '@/context/providers/AuthProvider';
import { createMobileClient } from '@repo/appwrite-config/src/client-mobile';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Account } from 'react-native-appwrite';
import '../global.css';
import { GradientBackground } from '@/components/ui/gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const projectName = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!;

const client = createMobileClient(endpoint, projectId, projectName);
const account = new Account(client);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const segments = useSegments();
    const router = useRouter();

    const [loaded, error] = useFonts({
        Geist: require('../assets/fonts/Geist-VariableFont_wght.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded) {
        return null;
    }

    return (
        <View className="flex-1">
            <StatusBar />

            <AuthProvider account={account} segments={segments} replace={router.replace}>
                <AuthGate>
                    <GradientBackground>
                        <SafeAreaView className="flex-1 bg-transparent">
                            <Slot />
                        </SafeAreaView>
                    </GradientBackground>
                </AuthGate>
            </AuthProvider>
        </View>
    );
}

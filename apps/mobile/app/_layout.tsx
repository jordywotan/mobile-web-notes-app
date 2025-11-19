import { AuthProvider, useAuth } from '@/context/providers/AuthProvider';
import { createMobileClient } from '@repo/appwrite-config/src/client-mobile';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Account } from 'react-native-appwrite';
import '../global.css';

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
        <AuthProvider account={account} segments={segments} replace={router.replace}>
            <Slot />
        </AuthProvider>
    );
}

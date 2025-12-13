import { BottomTabBar, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

const CustomTabBar = (props: BottomTabBarProps) => {
    return (
        <View
            // Hier combineren we Tailwind classes met de 'style' prop voor de iOS-specifieke schaduw.
            className="absolute bottom-1 left-4 right-4 h-[80px] rounded-[16px] overflow-hidden android:elevation-8"
            style={
                Platform.OS === 'ios'
                    ? {
                          shadowColor: 'rgba(0, 0, 0, 0.05)',
                          shadowOffset: { width: 0, height: -1 },
                          shadowRadius: 10,
                          shadowOpacity: 1,
                      }
                    : {}
            }
        >
            <View className="absolute inset-0 bg-white/95" />
            <BottomTabBar {...props} />
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                sceneStyle: { backgroundColor: 'transparent' },
                headerShown: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#4B5563',

                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                }}
            />
            <Tabs.Screen
                name="data"
                options={{
                    title: 'Data',
                    tabBarLabel: 'DatTA',
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;

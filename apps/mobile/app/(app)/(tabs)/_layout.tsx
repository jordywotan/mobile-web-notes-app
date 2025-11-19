import { Tabs } from 'expo-router';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
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

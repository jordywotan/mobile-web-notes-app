import Constants from 'expo-constants';
import { Image, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type AppBrandProps = {
    appName?: string;
    containerClassName?: string;
    iconContainerClassName?: string;
    textClassName?: string;
};

export function AppBrand({
    appName = Constants.expoConfig?.name,
    containerClassName,
    iconContainerClassName,
    textClassName,
}: AppBrandProps) {
    return (
        <View className={twMerge('flex-row items-center justify-center gap-7', containerClassName)}>
            <View
                className={twMerge(
                    'h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm',
                    iconContainerClassName,
                )}
            >
                <Image
                    className="h-6 w-6"
                    resizeMode="contain"
                    source={require('../../../assets/icon.png')}
                />
            </View>
            <Text
                className={twMerge(
                    'text-center font-display text-xl tracking-[3px]',
                    textClassName,
                )}
            >
                {appName}
            </Text>
        </View>
    );
}

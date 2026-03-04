import { LogBox } from 'react-native';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

LogBox.ignoreLogs([
  'SafeAreaView',
  'SafeAreaView has been deprecated',
  "SafeAreaView has been deprecated and will be removed in a future release. Please use 'react-native-safe-area-context' instead.",
]);

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args.map((arg) => String(arg)).join(' ');

  if (message.includes('SafeAreaView has been deprecated')) {
    return;
  }

  originalWarn(...args);
};

import 'expo-router/entry';

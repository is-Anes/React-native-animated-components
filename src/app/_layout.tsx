import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Honk-Regular': require('../../assets/fonts/honk-regular.otf'),
    'SF-Pro-Rounded-Bold': require('../../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'SF-Pro-Rounded-Heavy': require('../../assets/fonts/SF-Pro-Rounded-Heavy.otf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: 'Everybody can cook',
            headerTransparent: true,
            headerBlurEffect: 'dark',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 17,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="magnets-spring" />
        <Stack.Screen name="magnets-timing" />
        <Stack.Screen name="animated-gradient" />
        <Stack.Screen name="animated-radial-gradient" />
        <Stack.Screen name="atlas" />
      </Stack>
    </GestureHandlerRootView>
  );
}

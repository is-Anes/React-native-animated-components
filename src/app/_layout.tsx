import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
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

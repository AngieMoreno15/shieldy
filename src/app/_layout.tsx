
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { palette } from '@/theme/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.sky },
          animation: 'fade',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="alert/[id]" />
        <Stack.Screen name="destination/[id]" />
        <Stack.Screen name="report" />
      </Stack>
    </>
  );
}

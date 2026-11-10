import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import { palette } from '@/theme/colors';

export default function TabGroupLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.canvas },
        }}
      />
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
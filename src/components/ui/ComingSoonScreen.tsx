import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface ComingSoonScreenProps {
  title: string;
}

export default function ComingSoonScreen({ title }: ComingSoonScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>SHIELDY · DEMOSTRACIÓN</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            Esta sección estará disponible en una siguiente fase de la demostración.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace('/(tabs)/home')}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.sky,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    padding: spacing.xl,
    borderRadius: 28,
    backgroundColor: palette.white,
  },
  eyebrow: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
  },
  description: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 24,
    backgroundColor: palette.coral,
  },
  buttonText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});

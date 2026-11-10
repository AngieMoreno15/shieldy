
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function WelcomeScreen() {
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  const compact = height < 750;
  const horizontalPadding = width < 360 ? spacing.md : spacing.lg;

  const enterApp = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { minHeight: Math.max(height, compact ? 620 : 720) }]}>
          <View style={styles.logoSection}>
            <Image
              source={require('../../assets/images/shieldy-logo-transparent.png')}
              accessible
              accessibilityLabel="Logo de Shieldy"
              style={[styles.logo, compact && styles.smallLogo]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../assets/images/shieldy-welcome-illustration.png')}
              accessible
              accessibilityLabel="Viajera con sombrero y mochila explorando un destino"
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.buttonsPanel, { paddingHorizontal: horizontalPadding }]}>
            <Text style={styles.welcomeText}>
              Aventura y tranquilidad, en cada viaje.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Crear cuenta y entrar a la demostración"
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={enterApp}
            >
              <Text style={styles.primaryText}>
                Crear cuenta
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Iniciar sesión y entrar a la demostración"
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.pressed,
              ]}
              onPress={enterApp}
            >
              <Text style={styles.secondaryText}>
                Iniciar sesión
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continuar como invitado y entrar a la demostración"
              style={styles.guestButton}
              android_ripple={{ color: palette.softSky }}
              onPress={enterApp}
            >
              <Text style={styles.guestText}>
                Continuar como invitado
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.sky,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: palette.sky,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: spacing.sm,
    justifyContent: 'space-between',
    backgroundColor: palette.sky,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
  logo: {
    width: 158,
    height: 194,
  },
  smallLogo: {
    width: 132,
    height: 162,
  },
  illustrationContainer: {
    width: '100%',
    flex: 1,
    minHeight: 175,
    maxHeight: 390,
    marginVertical: spacing.xs,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  buttonsPanel: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
    overflow: 'hidden',
  },
  welcomeText: {
    alignSelf: 'center',
    marginBottom: spacing.xs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 28,
    backgroundColor: palette.coral,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  primaryText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 28,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  secondaryText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  guestButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestText: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});

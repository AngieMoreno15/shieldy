import { Image, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function ProfileAboutCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Image
            source={require('../../../assets/images/shieldy-logo-transparent.png')}
            resizeMode="contain"
            style={styles.logo}
            accessibilityLabel="Logo de Shieldy"
          />
        </View>
        <View style={styles.heading}>
          <Text style={styles.name}>Shieldy</Text>
          <Text style={styles.version}>Versión 1.0.0 · Demo</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Una compañera de viaje para descubrir destinos y explorar herramientas de seguridad.
      </Text>
      <Text style={styles.disclaimer}>
        Proyecto académico con contenido simulado. No es un servicio de emergencia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.softSky,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoBox: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: palette.white,
  },
  logo: {
    width: 37,
    height: 37,
  },
  heading: {
    flex: 1,
  },
  name: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  version: {
    marginTop: 3,
    color: palette.muted,
    fontSize: 10,
  },
  description: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
  },
  disclaimer: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
});

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Destination } from '@/types/destination.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface ProfileDestinationRowProps {
  destination: Destination;
  onPress: () => void;
}

export default function ProfileDestinationRow({
  destination,
  onPress,
}: ProfileDestinationRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir destino favorito ${destination.city}, ${destination.country}`}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Image
        source={destination.image}
        accessibilityLabel={destination.imageAccessibilityLabel}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.text}>
        <Text numberOfLines={1} style={styles.city}>{destination.city}</Text>
        <Text numberOfLines={1} style={styles.country}>{destination.country}</Text>
        <Text style={styles.demo}>PUNTUACIÓN DEMO · {destination.illustrativeSafetyIndex}/100</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: palette.softSky,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  city: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  country: {
    marginTop: 2,
    color: palette.muted,
    fontSize: 10,
  },
  demo: {
    marginTop: spacing.xs,
    color: '#347452',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  arrow: {
    color: palette.muted,
    fontSize: 24,
    lineHeight: 26,
  },
  pressed: {
    opacity: 0.72,
  },
});

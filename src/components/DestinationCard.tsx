import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Destination } from '@/types/destination.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

export default function DestinationCard({ destination, onPress }: DestinationCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver destino: ${destination.city}, ${destination.country}`}
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}>
        <Image
          source={destination.image}
          style={styles.image}
          resizeMode="cover"
          accessible
          accessibilityLabel={destination.imageAccessibilityLabel}
        />
        <View style={styles.demoBadge}>
          <Text style={styles.demoBadgeText}>
            {destination.imageKind === 'illustration' ? 'ILUSTRACIÓN DEMO' : 'DESTINO DEMO'}
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.cityRow}>
            <Image
              source={destination.flagImage}
              style={styles.flag}
              resizeMode="cover"
              accessible
              accessibilityLabel={destination.flagAccessibilityLabel}
            />
            <Text style={styles.city}>{destination.city}</Text>
          </View>
          <Text style={styles.country}>{destination.country}</Text>
          <Text style={styles.description}>{destination.description}</Text>
          <View style={styles.indexContainer}>
            <Text style={styles.indexTitle}>Índice ilustrativo</Text>
            <Text style={styles.indexValue}>{destination.illustrativeSafetyIndex}/100</Text>
          </View>
          <Text style={styles.demoNote}>Puntuación simulada · No es un dato real</Text>
        </View>
      </Pressable>
      {destination.photoAttribution.href ? (
        <Link href={destination.photoAttribution.href} target="_blank" asChild>
          <Pressable
            accessibilityRole="link"
            style={styles.attribution}
            android_ripple={{ color: palette.softSky }}>
            <Text style={styles.attributionText}>{destination.photoAttribution.label}</Text>
          </Pressable>
        </Link>
      ) : (
        <Text style={styles.attributionText}>{destination.photoAttribution.label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 148,
    backgroundColor: palette.softSky,
  },
  demoBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    backgroundColor: palette.white,
  },
  demoBadgeText: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  info: {
    padding: spacing.md,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  flag: {
    width: 34,
    height: 23,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.border,
  },
  city: {
    flex: 1,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
  },
  country: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: typography.fontSize.caption,
  },
  description: {
    minHeight: 38,
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 12,
    lineHeight: 18,
  },
  indexContainer: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    borderRadius: 14,
    backgroundColor: palette.softGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  indexTitle: {
    flexShrink: 1,
    color: palette.ink,
    fontSize: 11,
    fontWeight: '600',
  },
  indexValue: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  demoNote: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 14,
  },
  attribution: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xxs,
  },
  attributionText: {
    color: palette.muted,
    fontSize: 9,
    lineHeight: 13,
  },
  pressed: {
    opacity: 0.82,
  },
});
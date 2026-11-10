import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import DestinationFavoriteButton from '@/features/destinations/detail/DestinationFavoriteButton';
import type { Destination } from '@/types/destination.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface DestinationDetailHeroProps {
  destination: Destination;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
}

export default function DestinationDetailHero({
  destination,
  isFavorite,
  onBack,
  onToggleFavorite,
}: DestinationDetailHeroProps) {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver a la guía de destinos"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={18}
            tintColor={palette.ink}
          />
          <Text style={styles.backLabel}>Guía de destinos</Text>
        </Pressable>
        <DestinationFavoriteButton
          isFavorite={isFavorite}
          onPress={onToggleFavorite}
        />
      </View>

      <ImageBackground
        source={destination.image}
        resizeMode="cover"
        imageStyle={styles.image}
        style={styles.hero}
        accessible
        accessibilityLabel={destination.imageAccessibilityLabel}>
        <View style={styles.scrim} />
        <View style={styles.heroContent}>
          <View style={styles.placeLine}>
            <Image
              source={destination.flagImage}
              style={styles.flag}
              resizeMode="cover"
              accessible
              accessibilityLabel={destination.flagAccessibilityLabel}
            />
            <Text style={styles.country}>{destination.country}</Text>
            <Text style={styles.separator}>·</Text>
            <Text style={styles.continent}>{continentNames[destination.continent]}</Text>
          </View>
          <Text style={styles.city}>{destination.city}</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoLabel}>
              {destination.imageKind === 'illustration'
                ? 'ILUSTRACIÓN DEMOSTRATIVA'
                : 'DESTINO DEMOSTRATIVO'}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.attribution}>{destination.photoAttribution.label}</Text>
    </View>
  );
}

const continentNames: Record<Destination['continent'], string> = {
  africa: 'África',
  asia: 'Asia',
  europe: 'Europa',
  'north-america': 'Norteamérica',
  oceania: 'Oceanía',
  'south-america': 'Sudamérica',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  toolbar: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  backButton: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.white,
  },
  backLabel: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  hero: {
    width: '100%',
    minWidth: 0,
    height: 240,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 26,
    backgroundColor: palette.softSky,
  },
  image: {
    borderRadius: 26,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(25, 45, 54, 0.38)',
  },
  heroContent: {
    padding: spacing.lg,
  },
  placeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.white,
  },
  country: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },
  separator: {
    color: palette.white,
    fontSize: 14,
  },
  continent: {
    color: palette.white,
    fontSize: 12,
  },
  city: {
    marginTop: spacing.xs,
    color: palette.white,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.display,
    lineHeight: typography.lineHeight.display,
    fontWeight: typography.fontWeight.extrabold,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  demoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    marginTop: spacing.xs,
    borderRadius: 12,
    backgroundColor: palette.white,
  },
  demoLabel: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  attribution: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.78,
  },
});

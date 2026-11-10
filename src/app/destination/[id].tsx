import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';

import DestinationDetailHero from '@/features/destinations/detail/DestinationDetailHero';
import DestinationEmergencyContacts from '@/features/destinations/detail/DestinationEmergencyContacts';
import DestinationInfoSection from '@/features/destinations/detail/DestinationInfoSection';
import DestinationSafetyScore from '@/features/destinations/detail/DestinationSafetyScore';
import {
  getFavoriteDestinationIds,
  subscribeToFavoriteDestinations,
  toggleFavoriteDestination,
} from '@/services/destination-favorites.service';
import {
  getDestinationById,
  getDestinationGuideContent,
} from '@/services/destinations.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const favoriteIds = useSyncExternalStore(
    subscribeToFavoriteDestinations,
    getFavoriteDestinationIds,
    getFavoriteDestinationIds,
  );
  const destination = typeof id === 'string' ? getDestinationById(id) : undefined;
  const guide = typeof id === 'string' ? getDestinationGuideContent(id) : undefined;
  const isFavorite = destination ? favoriteIds.has(destination.id) : false;
  const wideLayout = width >= 760;
  const contentCellStyle = wideLayout ? styles.halfCell : styles.fullCell;

  const returnToGuide = () => {
    router.replace('/(tabs)/destinations');
  };

  if (!destination || !guide) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <View style={styles.notFoundContainer}>
          <View style={styles.notFoundCard}>
            <Text style={styles.eyebrow}>SHIELDY · DEMOSTRACIÓN</Text>
            <Text style={styles.notFoundTitle}>No encontramos este destino</Text>
            <Text style={styles.notFoundDescription}>
              Este destino no forma parte del catálogo de demostración.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={returnToGuide}
              style={({ pressed }) => [styles.returnButton, pressed && styles.pressed]}>
              <Text style={styles.returnButtonText}>Volver a la guía</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: width < 360 ? spacing.md : spacing.lg },
        ]}>
        <DestinationDetailHero
          destination={destination}
          isFavorite={isFavorite}
          onBack={returnToGuide}
          onToggleFavorite={() => toggleFavoriteDestination(destination.id)}
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionEyebrow}>DESCUBRE EL DESTINO</Text>
          <Text style={styles.sectionTitle}>Una guía para inspirarte</Text>
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.overviewHeading}>
            <View style={styles.overviewIcon}>
              <SymbolView
                name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
                size={19}
                tintColor={palette.ink}
              />
            </View>
            <Text style={styles.overviewTitle}>Sobre {destination.city}</Text>
          </View>
          <Text style={styles.overviewDescription}>{destination.description}</Text>
          <Text style={styles.demoNote}>
            Descripción general de demostración; revisa fuentes oficiales al planear un viaje real.
          </Text>
        </View>

        <DestinationSafetyScore score={destination.illustrativeSafetyIndex} />

        <View style={styles.informationHeading}>
          <Text style={styles.sectionEyebrow}>IDEAS PARA TU VIAJE</Text>
          <Text style={styles.informationSubtitle}>
            Contenido ilustrativo para explorar esta ficha.
          </Text>
        </View>

        <View style={styles.informationGrid}>
          <View style={[styles.informationCell, contentCellStyle]}>
            <DestinationInfoSection
              title="Consejos de seguridad"
              icon={{ ios: 'shield.fill', android: 'shield', web: 'shield' }}
              items={guide.safetyTips}
            />
          </View>
          <View style={[styles.informationCell, contentCellStyle]}>
            <DestinationInfoSection
              title="Transporte"
              icon={{ ios: 'tram.fill', android: 'directions_transit', web: 'directions_transit' }}
              items={guide.transportTips}
            />
          </View>
          <View style={[styles.informationCell, contentCellStyle]}>
            <DestinationInfoSection
              title="Salud"
              icon={{ ios: 'cross.case.fill', android: 'medical_services', web: 'medical_services' }}
              items={guide.healthTips}
            />
          </View>
          <View style={[styles.informationCell, contentCellStyle]}>
            <DestinationInfoSection
              title="Recomendaciones para viajeros"
              icon={{ ios: 'suitcase.fill', android: 'luggage', web: 'luggage' }}
              items={guide.travelerRecommendations}
            />
          </View>
          <View style={styles.fullCell}>
            <DestinationInfoSection
              title="Lugares de interés"
              icon={{ ios: 'mappin.and.ellipse', android: 'place', web: 'place' }}
              items={guide.pointsOfInterest}
              displayAsChips
            />
          </View>
        </View>

        <DestinationEmergencyContacts contacts={guide.emergencyContacts} />

        <View style={styles.footerNotice}>
          <SymbolView
            name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
            size={17}
            tintColor={palette.ink}
          />
          <Text style={styles.footerNoticeText}>
            Esta guía completa es una demostración académica. Sus consejos, lugares, indicador y
            contactos no son información verificada ni deben usarse como orientación de emergencia.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  sectionHeading: {
    marginTop: spacing.sm,
  },
  sectionEyebrow: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  sectionTitle: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: typography.fontWeight.extrabold,
  },
  overviewCard: {
    padding: spacing.lg,
    borderRadius: 22,
    backgroundColor: palette.white,
  },
  overviewHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  overviewIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.softYellow,
  },
  overviewTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  overviewDescription: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  demoNote: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  informationHeading: {
    marginTop: spacing.xs,
    marginBottom: -spacing.xs,
  },
  informationSubtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 11,
  },
  informationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  informationCell: {
    minWidth: 0,
  },
  fullCell: {
    width: '100%',
  },
  halfCell: {
    width: '48%',
  },
  footerNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: palette.softSky,
  },
  footerNoticeText: {
    flex: 1,
    color: palette.ink,
    fontSize: 10,
    lineHeight: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  notFoundCard: {
    width: '100%',
    maxWidth: 480,
    padding: spacing.xl,
    borderRadius: 26,
    backgroundColor: palette.white,
  },
  eyebrow: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  notFoundTitle: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 23,
    fontWeight: '800',
  },
  notFoundDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  returnButton: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 24,
    backgroundColor: palette.coral,
  },
  returnButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});

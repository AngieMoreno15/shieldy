import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import DestinationCard from '@/components/DestinationCard';
import DestinationFilterBar from '@/features/destinations/DestinationFilterBar';
import {
  getDestinationContinentCounts,
  getFeaturedDestinations,
  getMatchingDestinations,
} from '@/services/destinations.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import type { DestinationContinent } from '@/types/destination.types';

export default function DestinationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<DestinationContinent | 'all'>('all');
  const { width } = useWindowDimensions();
  const router = useRouter();
  const destinations = useMemo(() => getFeaturedDestinations(), []);
  const matchingDestinations = useMemo(
    () => getMatchingDestinations(searchQuery, selectedContinent),
    [searchQuery, selectedContinent],
  );
  const continentCount = Object.values(getDestinationContinentCounts()).filter(
    (count) => count > 0,
  ).length;
  const gridCellStyle =
    width >= 1060 ? styles.gridCellThree : width >= 700 ? styles.gridCellTwo : styles.gridCellOne;

  const openDestination = (id: string) => {
    router.push({ pathname: '/destination/[id]', params: { id } });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedContinent('all');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: width < 360 ? spacing.md : spacing.lg },
        ]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Guía de destinos</Text>
            <Text style={styles.subtitle}>Ideas para tu próxima aventura por el mundo</Text>
          </View>
          <View style={styles.headerIcon}>
            <SymbolView
              name={{ ios: 'globe.americas.fill', android: 'public', web: 'public' }}
              size={23}
              tintColor={palette.ink}
            />
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroEyebrow}>
            <SymbolView
              name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
              size={14}
              tintColor={palette.ink}
            />
            <Text style={styles.heroEyebrowText}>INSPIRACIÓN PARA VIAJAR</Text>
          </View>
          <Text style={styles.heroTitle}>Un mundo de lugares por descubrir</Text>
          <Text style={styles.heroDescription}>
            Explora ciudades de distintos continentes. Las puntuaciones de seguridad son ejemplos
            ilustrativos, no evaluaciones reales.
          </Text>
          <View style={styles.catalogCount}>
            <Text style={styles.catalogCountNumber}>{destinations.length}</Text>
            <Text style={styles.catalogCountLabel}>
              destinos demo · {continentCount} continentes
            </Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={20}
            tintColor={palette.muted}
          />
          <TextInput
            accessibilityLabel="Buscar por ciudad o país"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setSearchQuery}
            placeholder="Busca un país o una ciudad"
            placeholderTextColor={palette.muted}
            returnKeyType="search"
            style={styles.searchInput}
            value={searchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Limpiar búsqueda"
              hitSlop={8}
              onPress={() => setSearchQuery('')}>
              <SymbolView
                name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
                size={19}
                tintColor={palette.muted}
              />
            </Pressable>
          )}
        </View>
        {searchQuery.trim().length > 0 && (
          <Text accessibilityLiveRegion="polite" style={styles.searchCount}>
            {matchingDestinations.length === 1
              ? '1 destino encontrado'
              : `${matchingDestinations.length} destinos encontrados`}
          </Text>
        )}

        <Text style={styles.filterHeading}>Explora por continente</Text>
        <DestinationFilterBar
          selectedContinent={selectedContinent}
          onSelectContinent={setSelectedContinent}
        />

        <View style={styles.resultsHeading}>
          <View>
            <Text style={styles.resultsTitle}>
              {searchQuery.trim() || selectedContinent !== 'all'
                ? 'Resultados'
                : 'Destinos destacados'}
            </Text>
            <Text style={styles.resultsSubtitle}>Lugares y puntuaciones de demostración</Text>
          </View>
          <Text style={styles.resultsCount}>
            {matchingDestinations.length} {matchingDestinations.length === 1 ? 'lugar' : 'lugares'}
          </Text>
        </View>

        {matchingDestinations.length > 0 ? (
          <View style={styles.grid}>
            {matchingDestinations.map((destination) => (
              <View key={destination.id} style={[styles.gridCell, gridCellStyle]}>
                <DestinationCard
                  destination={destination}
                  onPress={() => openDestination(destination.id)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <SymbolView
                name={{ ios: 'magnifyingglass', android: 'search_off', web: 'search_off' }}
                size={25}
                tintColor={palette.muted}
              />
            </View>
            <Text style={styles.emptyTitle}>No encontramos destinos</Text>
            <Text style={styles.emptyDescription}>
              Prueba con otra ciudad, país o continente.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={clearFilters}
              style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}>
              <Text style={styles.clearButtonText}>Limpiar búsqueda y filtros</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.disclaimer}>
          <SymbolView
            name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
            size={17}
            tintColor={palette.ink}
          />
          <Text style={styles.disclaimerText}>
            El índice de seguridad es ficticio y se muestra solo para esta demostración académica.
            No representa condiciones reales del destino.
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 13,
  },
  headerIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: palette.softGreen,
  },
  hero: {
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 26,
    backgroundColor: palette.softSky,
  },
  heroEyebrow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 18,
    backgroundColor: palette.white,
  },
  heroEyebrowText: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroTitle: {
    marginTop: spacing.md,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: typography.fontWeight.extrabold,
  },
  heroDescription: {
    maxWidth: 680,
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  catalogCount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  catalogCountNumber: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 21,
    fontWeight: '800',
  },
  catalogCountLabel: {
    color: palette.ink,
    fontSize: 11,
    fontWeight: '600',
  },
  searchBox: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 17,
    backgroundColor: palette.white,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.sm,
    color: palette.ink,
    fontSize: 15,
  },
  searchCount: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: typography.fontSize.caption,
  },
  filterHeading: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  resultsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  resultsTitle: {
    color: palette.ink,
    fontSize: 19,
    fontWeight: '800',
  },
  resultsSubtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 11,
  },
  resultsCount: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  gridCell: {
    minWidth: 0,
  },
  gridCellOne: {
    width: '100%',
  },
  gridCellTwo: {
    width: '48%',
  },
  gridCellThree: {
    width: '31.5%',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderRadius: 22,
    backgroundColor: palette.white,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.softSky,
  },
  emptyTitle: {
    marginTop: spacing.md,
    color: palette.ink,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  clearButton: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.ink,
  },
  clearButtonText: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '700',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.md,
    marginTop: spacing.xs,
    borderRadius: 16,
    backgroundColor: palette.softYellow,
  },
  disclaimerText: {
    flex: 1,
    color: palette.ink,
    fontSize: 10,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.78,
  },
});

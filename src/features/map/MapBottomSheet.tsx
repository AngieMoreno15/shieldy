import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { mapCategoryOptions } from '@/features/map/map-categories';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import type { MapMarker } from '@/types/map.types';

interface MapBottomSheetProps {
  markers: MapMarker[];
  visibleMarkerCount: number;
  selectedMarker: MapMarker | null;
  expanded: boolean;
  onToggleExpanded: () => void;
  onReset: () => void;
  onSelectMarker: (marker: MapMarker) => void;
}

export default function MapBottomSheet({
  markers,
  visibleMarkerCount,
  selectedMarker,
  expanded,
  onToggleExpanded,
  onReset,
  onSelectMarker,
}: MapBottomSheetProps) {
  const groupedMarkers = mapCategoryOptions
    .filter((category) => category.id !== 'all')
    .map((category) => ({
      category,
      markers: markers.filter((marker) => marker.category === category.id),
    }));

  const selectedCategory = selectedMarker
    ? mapCategoryOptions.find((category) => category.id === selectedMarker.category)
    : undefined;

  return (
    <View style={styles.sheet}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={expanded ? 'Contraer información del mapa' : 'Expandir información del mapa'}
        accessibilityState={{ expanded }}
        onPress={onToggleExpanded}
        style={styles.handleArea}>
        <View style={styles.handle} />
      </Pressable>

      <View style={styles.sheetHeader}>
        <View style={styles.sheetTitleGroup}>
          <Text style={styles.eyebrow}>INFORMACIÓN DEL MAPA</Text>
          <Text style={styles.title}>
            {selectedMarker ? selectedMarker.title : 'Explora el mapa'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          {(selectedMarker || expanded) && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Volver al mapa general"
              onPress={onReset}
              style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}>
              <SymbolView
                name={{ ios: 'map', android: 'map', web: 'map' }}
                size={15}
                tintColor={palette.ink}
              />
              <Text style={styles.resetText}>Vista general</Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Contraer panel' : 'Expandir panel'}
            accessibilityState={{ expanded }}
            onPress={onToggleExpanded}
            style={({ pressed }) => [styles.expandButton, pressed && styles.pressed]}>
            <SymbolView
              name={{
                ios: expanded ? 'chevron.down' : 'chevron.up',
                android: expanded ? 'expand_more' : 'expand_less',
                web: expanded ? 'expand_more' : 'expand_less',
              }}
              size={17}
              tintColor={palette.ink}
            />
          </Pressable>
        </View>
      </View>

      {!expanded ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Expandir categorías del mapa"
          onPress={onToggleExpanded}
          style={styles.summaryRow}>
          <Text style={styles.summaryCount}>
            {visibleMarkerCount} ubicaciones demostrativas
          </Text>
          <View style={styles.categoryDots}>
            {groupedMarkers
              .filter((group) => group.markers.length > 0)
              .map(({ category }) => (
                <View
                  key={category.id}
                  style={[styles.categoryDot, { backgroundColor: category.color }]}
                />
              ))}
          </View>
          <Text style={styles.summaryLink}>Ver detalles</Text>
        </Pressable>
      ) : (
        <ScrollView
          style={styles.expandedContent}
          contentContainerStyle={styles.expandedContentInner}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}>
          {selectedMarker && selectedCategory && (
            <View
              style={[
                styles.selectedCard,
                { backgroundColor: selectedCategory.backgroundColor },
              ]}>
              <View style={styles.selectedCategoryRow}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: selectedCategory.color },
                  ]}>
                  <SymbolView name={selectedCategory.icon} size={17} tintColor={palette.white} />
                </View>
                <Text style={styles.categoryLabel}>{selectedCategory.label}</Text>
                <Text style={styles.demoBadge}>DEMO</Text>
              </View>
              <Text style={styles.description}>{selectedMarker.description}</Text>
              <View style={styles.infoRow}>
                <SymbolView
                  name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                  size={15}
                  tintColor={palette.ink}
                />
                <Text style={styles.infoText}>{selectedMarker.location}</Text>
              </View>
              <View style={styles.infoRow}>
                <SymbolView
                  name={{ ios: 'clock.fill', android: 'schedule', web: 'schedule' }}
                  size={15}
                  tintColor={palette.ink}
                />
                <Text style={styles.infoText}>
                  {selectedMarker.demonstrationDate}
                </Text>
              </View>
              <Text style={styles.disclaimer}>
                Ubicación y contenido simulados. No representa una alerta ni un lugar verificado.
              </Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Categorías en este mapa</Text>
          <View style={styles.categoryList}>
            {groupedMarkers.map(({ category, markers: categoryMarkers }) => (
              <View key={category.id} style={styles.categoryRow}>
                <View
                  style={[styles.categoryIconSmall, { backgroundColor: category.backgroundColor }]}>
                  <SymbolView name={category.icon} size={15} tintColor={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.label}</Text>
                <Text style={styles.categoryCount}>{categoryMarkers.length}</Text>
                {categoryMarkers.length > 0 && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Seleccionar ejemplo de ${category.label}`}
                    onPress={() => onSelectMarker(categoryMarkers[0])}
                    hitSlop={8}>
                    <Text style={styles.viewExample}>Ver ejemplo</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
          <Text style={styles.footerNote}>
            Todas las ubicaciones se muestran con fines demostrativos y no sustituyen información local verificada.
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: palette.white,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.09,
    shadowRadius: 13,
    elevation: 8,
  },
  handleArea: {
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: 39,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.border,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  sheetTitleGroup: {
    flex: 1,
    minWidth: 0,
  },
  eyebrow: {
    color: palette.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 17,
    fontWeight: typography.fontWeight.bold,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  resetButton: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: 17,
    backgroundColor: palette.softSky,
  },
  resetText: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '700',
  },
  expandButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: palette.softSky,
  },
  summaryRow: {
    minHeight: 37,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summaryCount: {
    flexShrink: 1,
    color: palette.muted,
    fontSize: 11,
  },
  categoryDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    marginRight: 'auto',
  },
  categoryDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  summaryLink: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '700',
  },
  expandedContent: {
    maxHeight: 300,
  },
  expandedContentInner: {
    paddingBottom: spacing.xs,
  },
  selectedCard: {
    padding: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    borderRadius: 19,
  },
  selectedCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  categoryLabel: {
    flex: 1,
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  demoBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: palette.white,
    color: palette.coral,
    fontSize: 8,
    fontWeight: '800',
  },
  description: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontSize: 12,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  infoText: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 16,
  },
  disclaimer: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  sectionTitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  categoryList: {
    gap: spacing.xxs,
  },
  categoryRow: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: 12,
    backgroundColor: palette.canvas,
  },
  categoryIconSmall: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  categoryName: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
  },
  categoryCount: {
    minWidth: 20,
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  viewExample: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '700',
  },
  footerNote: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.7,
  },
});

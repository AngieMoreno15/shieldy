import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import MapBottomSheet from '@/features/map/MapBottomSheet';
import MapCanvas from '@/features/map/MapCanvas';
import { mapCategoryOptions } from '@/features/map/map-categories';
import { filterMapMarkers, getMapCities, getMapMarkers } from '@/services/map.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import type { MapCategory, MapCityId, MapMarker } from '@/types/map.types';

export default function MapScreen() {
  const cities = getMapCities();
  const [selectedCityId, setSelectedCityId] = useState<MapCityId>('bogota');
  const [selectedCategory, setSelectedCategory] = useState<MapCategory | 'all'>('all');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [cityPickerVisible, setCityPickerVisible] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const selectedCity =
    cities.find((city) => city.id === selectedCityId) ?? cities[0];
  const cityMarkers = useMemo(() => getMapMarkers(selectedCityId), [selectedCityId]);
  const visibleMarkers = useMemo(
    () => filterMapMarkers(cityMarkers, selectedCategory),
    [cityMarkers, selectedCategory],
  );
  const selectedMarker =
    cityMarkers.find((marker) => marker.id === selectedMarkerId) ?? null;

  const resetMap = () => {
    setSelectedCategory('all');
    setSelectedMarkerId(null);
    setIsCentered(false);
    setSheetExpanded(false);
  };

  const selectCity = (cityId: MapCityId) => {
    setSelectedCityId(cityId);
    setSelectedCategory('all');
    setSelectedMarkerId(null);
    setIsCentered(false);
    setSheetExpanded(false);
    setCityPickerVisible(false);
  };

  const selectCategory = (category: MapCategory | 'all') => {
    setSelectedCategory(category);
    setSelectedMarkerId(null);
    setIsCentered(false);
  };

  const selectMarker = (marker: MapMarker) => {
    setSelectedMarkerId(marker.id);
    setSheetExpanded(true);
    setIsCentered(false);
  };

  const centerIllustration = () => {
    setSelectedMarkerId(null);
    setSelectedCategory('all');
    setIsCentered(true);
    setSheetExpanded(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mapa interactivo</Text>
            <Text style={styles.subtitle}>Explora ubicaciones demostrativas</Text>
          </View>
          {(selectedCategory !== 'all' || selectedMarker !== null || isCentered) && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Regresar al estado general del mapa"
              onPress={resetMap}
              style={({ pressed }) => [styles.generalButton, pressed && styles.pressed]}>
              <SymbolView
                name={{ ios: 'arrow.uturn.backward', android: 'refresh', web: 'refresh' }}
                size={17}
                tintColor={palette.ink}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.selectorWrapper}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Cambiar ciudad: ${selectedCity.name}, ${selectedCity.country}`}
            accessibilityState={{ expanded: cityPickerVisible }}
            onPress={() => setCityPickerVisible(true)}
            style={({ pressed }) => [styles.citySelector, pressed && styles.pressed]}>
            <View style={styles.selectorIcon}>
              <SymbolView
                name={{ ios: 'building.2.fill', android: 'location_city', web: 'location_city' }}
                size={18}
                tintColor={palette.ink}
              />
            </View>
            <View style={styles.cityText}>
              <Text style={styles.cityName}>{selectedCity.name}</Text>
              <Text style={styles.countryName}>{selectedCity.country}</Text>
            </View>
            <Text style={styles.demoCityLabel}>DEMO</Text>
            <SymbolView
              name={{ ios: 'chevron.down', android: 'expand_more', web: 'expand_more' }}
              size={17}
              tintColor={palette.muted}
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {mapCategoryOptions.map((option) => {
            const active = selectedCategory === option.id;

            return (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                accessibilityLabel={`Filtrar: ${option.label}`}
                accessibilityState={{ selected: active }}
                onPress={() => selectCategory(option.id)}
                style={({ pressed }) => [
                  styles.filterChip,
                  active
                    ? { backgroundColor: option.backgroundColor, borderColor: option.color }
                    : styles.inactiveChip,
                  pressed && styles.pressed,
                ]}>
                <SymbolView name={option.icon} size={15} tintColor={option.color} />
                <Text style={[styles.filterText, active && { color: option.color }]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.mapArea}>
          <MapCanvas
            city={selectedCity}
            markers={visibleMarkers}
            selectedMarkerId={selectedMarkerId}
            isCentered={isCentered}
            onSelectMarker={selectMarker}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Centrar la ilustración en una ubicación simulada"
            onPress={centerIllustration}
            style={({ pressed }) => [styles.locationButton, pressed && styles.pressed]}>
            <SymbolView
              name={{ ios: 'location.north.circle.fill', android: 'my_location', web: 'my_location' }}
              size={22}
              tintColor="#3284D3"
            />
            <Text style={styles.locationButtonText}>Centrar vista</Text>
          </Pressable>
          {visibleMarkers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No hay marcadores de esta categoría en este ejemplo.
              </Text>
            </View>
          )}
        </View>

        <MapBottomSheet
          markers={cityMarkers}
          visibleMarkerCount={visibleMarkers.length}
          selectedMarker={selectedMarker}
          expanded={sheetExpanded}
          onToggleExpanded={() => setSheetExpanded((expanded) => !expanded)}
          onReset={resetMap}
          onSelectMarker={selectMarker}
        />
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={cityPickerVisible}
        onRequestClose={() => setCityPickerVisible(false)}>
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cerrar selector de ciudades"
            style={styles.modalBackdrop}
            onPress={() => setCityPickerVisible(false)}
          />
          <View accessibilityLabel="Seleccionar ciudad" style={styles.cityPicker}>
            <View style={styles.modalHeading}>
              <View style={styles.modalHeadingText}>
                <Text style={styles.modalTitle}>Elige una ciudad</Text>
                <Text style={styles.modalSubtitle}>
                  Todas las ubicaciones son de demostración.
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cerrar selector"
                onPress={() => setCityPickerVisible(false)}
                style={styles.closeButton}>
                <SymbolView
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={17}
                  tintColor={palette.ink}
                />
              </Pressable>
            </View>
            {cities.map((city) => {
              const isSelected = city.id === selectedCityId;

              return (
                <Pressable
                  key={city.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => selectCity(city.id)}
                  style={({ pressed }) => [
                    styles.cityOption,
                    isSelected && styles.selectedCityOption,
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.cityOptionIcon}>
                    <SymbolView
                      name={{
                        ios: city.id === 'bogota' ? 'mountain.2.fill' : 'building.2.fill',
                        android: 'location_city',
                        web: 'location_city',
                      }}
                      size={19}
                      tintColor={isSelected ? palette.coral : palette.ink}
                    />
                  </View>
                  <View style={styles.cityText}>
                    <Text style={styles.cityOptionName}>{city.name}</Text>
                    <Text style={styles.countryName}>{city.country}</Text>
                  </View>
                  {isSelected && (
                    <SymbolView
                      name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                      size={20}
                      tintColor={palette.green}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
    paddingTop: spacing.sm,
  },
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 12,
  },
  generalButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    borderRadius: 14,
    backgroundColor: palette.softSky,
  },
  selectorWrapper: {
    paddingHorizontal: spacing.lg,
  },
  citySelector: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  selectorIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.softSky,
  },
  cityText: {
    flex: 1,
    minWidth: 0,
  },
  cityName: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  countryName: {
    marginTop: 2,
    color: palette.muted,
    fontSize: 11,
  },
  demoCityLabel: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    overflow: 'hidden',
    borderRadius: 9,
    backgroundColor: palette.softYellow,
    color: '#80621F',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  filters: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  filterChip: {
    minHeight: 37,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: 20,
  },
  inactiveChip: {
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  filterText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  mapArea: {
    flex: 1,
    minHeight: 245,
    position: 'relative',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 26,
  },
  locationButton: {
    position: 'absolute',
    right: spacing.sm,
    bottom: spacing.sm,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 18,
    backgroundColor: palette.white,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  locationButtonText: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '700',
  },
  emptyState: {
    position: 'absolute',
    top: '48%',
    alignSelf: 'center',
    maxWidth: '75%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 14,
    backgroundColor: palette.white,
  },
  emptyStateText: {
    color: palette.ink,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  modalRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#17263088',
  },
  cityPicker: {
    width: '100%',
    maxWidth: 440,
    padding: spacing.lg,
    borderRadius: 26,
    backgroundColor: palette.white,
    elevation: 10,
  },
  modalHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modalHeadingText: {
    flex: 1,
  },
  modalTitle: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
  },
  modalSubtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 11,
    lineHeight: 16,
  },
  closeButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.softSky,
  },
  cityOption: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 17,
    marginTop: spacing.xs,
  },
  selectedCityOption: {
    borderColor: palette.green,
    backgroundColor: palette.softGreen,
  },
  cityOptionIcon: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.white,
  },
  cityOptionName: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});

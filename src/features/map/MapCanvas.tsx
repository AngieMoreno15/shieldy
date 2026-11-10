import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { mapCategoryOptions } from '@/features/map/map-categories';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { MapCity, MapMarker } from '@/types/map.types';

interface MapCanvasProps {
  city: MapCity;
  markers: MapMarker[];
  selectedMarkerId: string | null;
  isCentered: boolean;
  onSelectMarker: (marker: MapMarker) => void;
}

const cityLabels: Record<MapCity['id'], string[]> = {
  bogota: ['ZONA VERDE', 'DISTRITO CENTRO', 'BARRIO NORTE'],
  'ciudad-de-mexico': ['PARQUE URBANO', 'CENTRO HISTÓRICO', 'ZONA CULTURAL'],
  marrakech: ['JARDÍN', 'DISTRITO CENTRAL', 'MEDINA'],
};

const streets = [
  { top: '8%', left: '-18%', width: '136%', rotation: '-13deg', thickness: 15 },
  { top: '34%', left: '-15%', width: '132%', rotation: '8deg', thickness: 18 },
  { top: '68%', left: '-15%', width: '132%', rotation: '-8deg', thickness: 16 },
  { top: '94%', left: '-18%', width: '136%', rotation: '13deg', thickness: 14 },
  { top: '-14%', left: '12%', width: '135%', rotation: '73deg', thickness: 15 },
  { top: '-15%', left: '39%', width: '140%', rotation: '104deg', thickness: 19 },
  { top: '-12%', left: '73%', width: '132%', rotation: '83deg', thickness: 14 },
  { top: '12%', left: '5%', width: '125%', rotation: '31deg', thickness: 7 },
  { top: '77%', left: '-15%', width: '133%', rotation: '-29deg', thickness: 8 },
];

const blocks = [
  { top: '21%', left: '11%', width: '17%', height: '9%', color: '#D5E4CE' },
  { top: '23%', left: '56%', width: '18%', height: '8%', color: '#D7E4D0' },
  { top: '44%', left: '15%', width: '17%', height: '10%', color: '#D3E2CB' },
  { top: '46%', left: '71%', width: '16%', height: '11%', color: '#D8E6D0' },
  { top: '75%', left: '22%', width: '20%', height: '8%', color: '#D6E4CE' },
  { top: '72%', left: '61%', width: '21%', height: '9%', color: '#D4E1CB' },
];

const parks = [
  { top: '10%', left: '69%', width: '19%', height: '12%' },
  { top: '56%', left: '18%', width: '18%', height: '11%' },
  { top: '77%', left: '71%', width: '16%', height: '10%' },
];

export default function MapCanvas({
  city,
  markers,
  selectedMarkerId,
  isCentered,
  onSelectMarker,
}: MapCanvasProps) {
  return (
    <View
      accessibilityLabel={`Mapa ilustrativo de ${city.name}; ubicaciones demostrativas, no es un mapa en tiempo real`}
      style={styles.container}>
      <View style={[styles.mapArtwork, isCentered && styles.centeredArtwork]}>
        <View style={styles.river} />
        {parks.map((park, index) => (
          <View
            key={`park-${index}`}
            style={[
              styles.park,
              { top: park.top, left: park.left, width: park.width, height: park.height },
            ]}>
            <View style={styles.parkLine} />
          </View>
        ))}
        {blocks.map((block, index) => (
          <View
            key={`block-${index}`}
            style={[
              styles.block,
              {
                top: block.top,
                left: block.left,
                width: block.width,
                height: block.height,
                backgroundColor: block.color,
              },
            ]}
          />
        ))}
        {streets.map((street, index) => (
          <View
            key={`street-${index}`}
            style={[
              styles.street,
              {
                top: street.top,
                left: street.left,
                width: street.width,
                height: street.thickness,
                transform: [{ rotate: street.rotation }],
              },
            ]}>
            <View style={styles.streetCenter} />
          </View>
        ))}
        {cityLabels[city.id].map((label, index) => (
          <View
            key={label}
            style={[
              styles.mapLabel,
              index === 0 && styles.firstMapLabel,
              index === 2 && styles.thirdMapLabel,
            ]}>
            <Text style={styles.mapLabelText}>{label}</Text>
          </View>
        ))}
        {isCentered && (
          <View style={styles.currentVisualLocation}>
            <View style={styles.visualLocationPulse} />
            <View style={styles.visualLocationDot} />
          </View>
        )}
        {markers.map((marker) => {
          const category = mapCategoryOptions.find((option) => option.id === marker.category);
          if (!category) {
            return null;
          }

          const selected = selectedMarkerId === marker.id;

          return (
            <Pressable
              key={marker.id}
              accessibilityRole="button"
              accessibilityLabel={`${marker.title}, categoría ${category.label}, ubicación de demostración`}
              accessibilityState={{ selected }}
              onPress={() => onSelectMarker(marker)}
              style={({ pressed }) => [
                styles.marker,
                { top: `${marker.y}%`, left: `${marker.x}%` },
                pressed && styles.markerPressed,
              ]}>
              {selected && <View style={[styles.markerHalo, { borderColor: category.color }]} />}
              <View
                style={[
                  styles.markerIcon,
                  { backgroundColor: category.color },
                  selected && styles.selectedMarkerIcon,
                ]}>
                <SymbolView name={category.icon} size={16} tintColor={palette.white} />
              </View>
              {selected && (
                <View style={styles.markerLabel}>
                  <Text numberOfLines={1} style={styles.markerLabelText}>
                    {marker.title}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.cityTag}>
        <SymbolView
          name={{ ios: 'location.fill', android: 'location_on', web: 'location_on' }}
          size={13}
          tintColor={palette.ink}
        />
        <Text style={styles.cityTagText}>{city.name.toLocaleUpperCase()}</Text>
      </View>

      <View style={styles.mapDisclaimer}>
        <SymbolView
          name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
          size={13}
          tintColor={palette.ink}
        />
        <Text style={styles.mapDisclaimerText}>Mapa ilustrativo · Ubicaciones de demostración</Text>
      </View>

      {isCentered && (
        <View style={styles.centeredCaption}>
          <Text style={styles.centeredCaptionText}>Centro visual simulado</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    overflow: 'hidden',
    borderRadius: 26,
    backgroundColor: '#E8F0DD',
  },
  mapArtwork: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  centeredArtwork: {
    transform: [{ scale: 1.07 }],
  },
  river: {
    position: 'absolute',
    top: '-7%',
    left: '33%',
    width: 77,
    height: '115%',
    borderRadius: 50,
    backgroundColor: '#C4E9E6',
    opacity: 0.88,
    transform: [{ rotate: '33deg' }],
  },
  park: {
    position: 'absolute',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#B8D7B3',
    backgroundColor: '#C9E1BE',
    transform: [{ rotate: '-13deg' }],
  },
  parkLine: {
    position: 'absolute',
    top: '45%',
    left: '12%',
    width: '75%',
    height: 2,
    borderRadius: 2,
    backgroundColor: '#B3D2AD',
    transform: [{ rotate: '28deg' }],
  },
  block: {
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBDCC5',
    transform: [{ rotate: '-8deg' }],
  },
  street: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#FFFDF4',
    borderWidth: 1,
    borderColor: '#D7DFC9',
    borderRadius: 99,
    opacity: 0.96,
  },
  streetCenter: {
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E1D9BD',
  },
  mapLabel: {
    position: 'absolute',
    top: '34%',
    left: '14%',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 9,
    backgroundColor: '#F6F5E9',
  },
  firstMapLabel: {
    top: '15%',
    left: '48%',
  },
  thirdMapLabel: {
    top: '66%',
    left: '57%',
  },
  mapLabelText: {
    color: '#738775',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  marker: {
    position: 'absolute',
    width: 42,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -21,
    marginTop: -24,
  },
  markerPressed: {
    opacity: 0.75,
  },
  markerHalo: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 22,
    borderWidth: 2,
    opacity: 0.38,
  },
  markerIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.white,
    borderRadius: 18,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedMarkerIcon: {
    transform: [{ scale: 1.12 }],
  },
  markerLabel: {
    position: 'absolute',
    top: 38,
    maxWidth: 140,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 9,
    backgroundColor: palette.white,
  },
  markerLabelText: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '700',
  },
  cityTag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 17,
    backgroundColor: palette.white,
  },
  cityTagText: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  mapDisclaimer: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    maxWidth: '57%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    backgroundColor: '#F8FCF0',
  },
  mapDisclaimerText: {
    flexShrink: 1,
    color: palette.ink,
    fontSize: 8,
    fontWeight: '600',
  },
  currentVisualLocation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -17,
    marginLeft: -17,
  },
  visualLocationPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#4C9BDD33',
  },
  visualLocationDot: {
    width: 16,
    height: 16,
    borderWidth: 3,
    borderColor: palette.white,
    borderRadius: 10,
    backgroundColor: '#3284D3',
    elevation: 3,
  },
  centeredCaption: {
    position: 'absolute',
    bottom: spacing.sm,
    alignSelf: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    backgroundColor: palette.white,
  },
  centeredCaptionText: {
    color: palette.ink,
    fontSize: 10,
    fontWeight: '700',
  },
});

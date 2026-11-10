import { demoMapCities } from '@/data/mock/map-cities.mock';
import { demoMapIncidents } from '@/data/mock/map-incidents.mock';
import { demoPointsOfInterest } from '@/data/mock/points-of-interest.mock';
import type { MapCategory, MapCity, MapCityId, MapMarker } from '@/types/map.types';

export function getMapCities(): MapCity[] {
  return demoMapCities;
}

export function getMapMarkers(cityId: MapCityId): MapMarker[] {
  const cityPoints = demoPointsOfInterest.filter((point) => point.cityId === cityId);
  const cityIncidents = demoMapIncidents.filter((incident) => incident.cityId === cityId);

  return [...cityPoints, ...cityIncidents];
}

export function filterMapMarkers(
  markers: MapMarker[],
  category: MapCategory | 'all',
): MapMarker[] {
  return category === 'all'
    ? markers
    : markers.filter((marker) => marker.category === category);
}

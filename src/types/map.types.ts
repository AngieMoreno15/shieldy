import type { ComponentProps } from 'react';
import type { SymbolView } from 'expo-symbols';

export type MapCityId = 'bogota' | 'ciudad-de-mexico' | 'marrakech';

export type MapCategory = 'safety' | 'tourism' | 'transport' | 'health';

export interface MapCity {
  id: MapCityId;
  name: string;
  country: string;
}

interface MapRecord {
  id: string;
  cityId: MapCityId;
  title: string;
  description: string;
  location: string;
  category: MapCategory;
  x: number;
  y: number;
  demonstrationDate: string;
  isDemonstrationData: true;
}

export interface PointOfInterest extends MapRecord {
  kind: 'point-of-interest';
}

export interface MapIncident extends MapRecord {
  kind: 'incident';
}

export type MapMarker = PointOfInterest | MapIncident;

export type MapSymbolName = ComponentProps<typeof SymbolView>['name'];

import type { ImageSourcePropType } from 'react-native';
import type { Href } from 'expo-router';

export interface PhotoAttribution {
  label: string;
  href?: Href;
}

export type DestinationContinent =
  | 'africa'
  | 'asia'
  | 'europe'
  | 'north-america'
  | 'oceania'
  | 'south-america';

export type DestinationImageKind = 'photograph' | 'illustration';

export interface Destination {
  id: string;
  city: string;
  country: string;
  flagImage: ImageSourcePropType;
  flagAccessibilityLabel: string;
  continent: DestinationContinent;
  description: string;
  image: ImageSourcePropType;
  imageKind: DestinationImageKind;
  imageAccessibilityLabel: string;
  photoAttribution: PhotoAttribution;
  illustrativeSafetyIndex: number;
  isDemonstrationData: true;
}

export interface DestinationEmergencyContact {
  label: string;
  number: string;
}

export interface DestinationGuideContent {
  destinationId: string;
  safetyTips: string[];
  transportTips: string[];
  healthTips: string[];
  travelerRecommendations: string[];
  pointsOfInterest: string[];
  emergencyContacts: DestinationEmergencyContact[];
  isDemonstrationData: true;
}
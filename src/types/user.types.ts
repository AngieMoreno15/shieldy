export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  homeCountry: string;
  travelerSince: string;
  isDemonstrationData: true;
}

export type ProfileLanguage = 'es' | 'en' | 'fr';

export interface ProfileNotificationPreferences {
  securityAlerts: boolean;
  destinationUpdates: boolean;
  weeklySummary: boolean;
}

export interface ProfilePrivacyPreferences {
  shareTravelActivity: boolean;
  personalizedSuggestions: boolean;
}

export interface ProfilePreferences {
  language: ProfileLanguage;
  notifications: ProfileNotificationPreferences;
  privacy: ProfilePrivacyPreferences;
}
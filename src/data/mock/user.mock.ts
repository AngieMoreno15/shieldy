import type { ProfilePreferences, UserProfile } from '@/types/user.types';

export const demoUser: UserProfile = {
  firstName: 'Angie',
  lastName: 'Rivera',
  email: 'angie.rivera@example.com',
  homeCountry: 'Colombia',
  travelerSince: '2024',
  isDemonstrationData: true,
};

export const demoProfilePreferences: ProfilePreferences = {
  language: 'es',
  notifications: {
    securityAlerts: true,
    destinationUpdates: true,
    weeklySummary: false,
  },
  privacy: {
    shareTravelActivity: false,
    personalizedSuggestions: true,
  },
};
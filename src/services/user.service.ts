import { demoProfilePreferences, demoUser } from '@/data/mock/user.mock';
import type {
  ProfileLanguage,
  ProfileNotificationPreferences,
  ProfilePreferences,
  ProfilePrivacyPreferences,
  UserProfile,
} from '@/types/user.types';

export function getCurrentUser(): UserProfile {
  return demoUser;
}

export type ProfilePreferencesChangeListener = () => void;

let profilePreferences = demoProfilePreferences;
const profilePreferenceListeners = new Set<ProfilePreferencesChangeListener>();

export function getProfilePreferences(): ProfilePreferences {
  return profilePreferences;
}

export function subscribeToProfilePreferences(
  listener: ProfilePreferencesChangeListener,
): () => void {
  profilePreferenceListeners.add(listener);
  return () => profilePreferenceListeners.delete(listener);
}

function notifyProfilePreferenceListeners(): void {
  profilePreferenceListeners.forEach((listener) => listener());
}

export function setProfileLanguage(language: ProfileLanguage): void {
  if (profilePreferences.language === language) return;
  profilePreferences = { ...profilePreferences, language };
  notifyProfilePreferenceListeners();
}

export function setProfileNotificationPreference(
  key: keyof ProfileNotificationPreferences,
  value: boolean,
): void {
  if (profilePreferences.notifications[key] === value) return;
  profilePreferences = {
    ...profilePreferences,
    notifications: { ...profilePreferences.notifications, [key]: value },
  };
  notifyProfilePreferenceListeners();
}

export function setProfilePrivacyPreference(
  key: keyof ProfilePrivacyPreferences,
  value: boolean,
): void {
  if (profilePreferences.privacy[key] === value) return;
  profilePreferences = {
    ...profilePreferences,
    privacy: { ...profilePreferences.privacy, [key]: value },
  };
  notifyProfilePreferenceListeners();
}

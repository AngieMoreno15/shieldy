import { useMemo, useSyncExternalStore } from 'react';

import {
  getFavoriteDestinationIds,
  subscribeToFavoriteDestinations,
} from '@/services/destination-favorites.service';
import { getFeaturedDestinations } from '@/services/destinations.service';
import {
  getSubmittedIncidentReports,
  subscribeToSubmittedIncidentReports,
} from '@/services/reports.service';
import {
  getCurrentUser,
  getProfilePreferences,
  subscribeToProfilePreferences,
} from '@/services/user.service';

const destinations = getFeaturedDestinations();

export function useProfileData() {
  const favoriteIds = useSyncExternalStore(
    subscribeToFavoriteDestinations,
    getFavoriteDestinationIds,
    getFavoriteDestinationIds,
  );
  const reports = useSyncExternalStore(
    subscribeToSubmittedIncidentReports,
    getSubmittedIncidentReports,
    getSubmittedIncidentReports,
  );
  const preferences = useSyncExternalStore(
    subscribeToProfilePreferences,
    getProfilePreferences,
    getProfilePreferences,
  );
  const favoriteDestinations = useMemo(
    () => destinations.filter((destination) => favoriteIds.has(destination.id)),
    [favoriteIds],
  );

  return {
    user: getCurrentUser(),
    favoriteDestinations,
    reports,
    preferences,
  };
}

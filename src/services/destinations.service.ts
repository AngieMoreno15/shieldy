import { demoDestinations } from '@/data/mock/destinations.mock';
import { demoDestinationDetails } from '@/data/mock/destination-details.mock';
import type {
  Destination,
  DestinationContinent,
  DestinationGuideContent,
} from '@/types/destination.types';

export function getFeaturedDestinations(): Destination[] {
  return demoDestinations;
}

export function getDestinationById(id: string): Destination | undefined {
  return demoDestinations.find((destination) => destination.id === id);
}

export function getDestinationGuideContent(
  destinationId: string,
): DestinationGuideContent | undefined {
  return demoDestinationDetails.find((content) => content.destinationId === destinationId);
}

export function normalizeDestinationSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterDestinationsByContinent(
  destinations: Destination[],
  continent: DestinationContinent | 'all',
): Destination[] {
  if (continent === 'all') return destinations;
  return destinations.filter((destination) => destination.continent === continent);
}

export function searchDestinations(query: string): Destination[] {
  const normalizedQuery = normalizeDestinationSearch(query);
  if (!normalizedQuery) return getFeaturedDestinations();

  return demoDestinations.filter((destination) => {
    const searchableText = normalizeDestinationSearch(
      `${destination.city} ${destination.country}`,
    );
    return searchableText.includes(normalizedQuery);
  });
}

export function getMatchingDestinations(
  query: string,
  continent: DestinationContinent | 'all',
): Destination[] {
  return filterDestinationsByContinent(searchDestinations(query), continent);
}

export function getDestinationContinentCounts(): Record<DestinationContinent, number> {
  return demoDestinations.reduce(
    (counts, destination) => {
      counts[destination.continent] += 1;
      return counts;
    },
    {
      africa: 0,
      asia: 0,
      europe: 0,
      'north-america': 0,
      oceania: 0,
      'south-america': 0,
    },
  );
}
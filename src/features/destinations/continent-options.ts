import type { DestinationContinent } from '@/types/destination.types';

export interface ContinentOption {
  id: DestinationContinent | 'all';
  label: string;
}

export const continentOptions: ContinentOption[] = [
  { id: 'all', label: 'Todos' },
  { id: 'south-america', label: 'Sudamérica' },
  { id: 'north-america', label: 'Norteamérica' },
  { id: 'europe', label: 'Europa' },
  { id: 'africa', label: 'África' },
  { id: 'asia', label: 'Asia' },
  { id: 'oceania', label: 'Oceanía' },
];

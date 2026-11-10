import type { ComponentProps } from 'react';
import { SymbolView } from 'expo-symbols';

import { palette } from '@/theme/colors';
import type { AlertCategory, AlertFilter, AlertPriority } from '@/types/alert.types';

type IconName = ComponentProps<typeof SymbolView>['name'];

export const alertCategoryPresentation: Record<
  AlertCategory,
  { label: string; icon: IconName }
> = {
  security: {
    label: 'Seguridad',
    icon: { ios: 'shield.fill', android: 'shield', web: 'shield' },
  },
  transport: {
    label: 'Transporte',
    icon: { ios: 'tram.fill', android: 'directions_transit', web: 'directions_transit' },
  },
  health: {
    label: 'Salud',
    icon: { ios: 'cross.case.fill', android: 'medical_services', web: 'medical_services' },
  },
};

export const alertPriorityPresentation: Record<
  AlertPriority,
  { label: string; color: string; backgroundColor: string }
> = {
  high: {
    label: 'Riesgo alto',
    color: '#C94B50',
    backgroundColor: '#FCE9E8',
  },
  caution: {
    label: 'Precaución',
    color: '#B85C12',
    backgroundColor: '#FFF0E1',
  },
  preventive: {
    label: 'Preventiva',
    color: '#3F8C68',
    backgroundColor: palette.softGreen,
  },
  transport: {
    label: 'Transporte',
    color: '#347FB4',
    backgroundColor: palette.softSky,
  },
};

export const alertFilterOptions: {
  id: AlertFilter;
  label: string;
  icon: IconName;
}[] = [
  {
    id: 'all',
    label: 'Todas',
    icon: { ios: 'square.grid.2x2.fill', android: 'apps', web: 'apps' },
  },
  {
    id: 'nearby',
    label: 'Cerca de mí',
    icon: { ios: 'location.fill', android: 'near_me', web: 'near_me' },
  },
  {
    id: 'security',
    label: 'Seguridad',
    icon: alertCategoryPresentation.security.icon,
  },
  {
    id: 'transport',
    label: 'Transporte',
    icon: alertCategoryPresentation.transport.icon,
  },
  {
    id: 'health',
    label: 'Salud',
    icon: alertCategoryPresentation.health.icon,
  },
];

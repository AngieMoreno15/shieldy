import type { ComponentProps } from 'react';
import { SymbolView } from 'expo-symbols';

import { palette } from '@/theme/colors';
import type { MapCategory } from '@/types/map.types';

type IconName = ComponentProps<typeof SymbolView>['name'];

export interface MapCategoryOption {
  id: MapCategory | 'all';
  label: string;
  icon: IconName;
  color: string;
  backgroundColor: string;
}

export const mapCategoryOptions: MapCategoryOption[] = [
  {
    id: 'all',
    label: 'Todos',
    icon: { ios: 'square.grid.2x2.fill', android: 'apps', web: 'apps' },
    color: palette.ink,
    backgroundColor: palette.softSky,
  },
  {
    id: 'safety',
    label: 'Riesgo / Seguridad',
    icon: { ios: 'shield.fill', android: 'shield', web: 'shield' },
    color: palette.coral,
    backgroundColor: palette.softCoral,
  },
  {
    id: 'tourism',
    label: 'Turismo',
    icon: { ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' },
    color: '#378E71',
    backgroundColor: palette.softGreen,
  },
  {
    id: 'transport',
    label: 'Transporte',
    icon: { ios: 'tram.fill', android: 'directions_transit', web: 'directions_transit' },
    color: '#9A7025',
    backgroundColor: palette.softYellow,
  },
  {
    id: 'health',
    label: 'Salud',
    icon: { ios: 'cross.case.fill', android: 'medical_services', web: 'medical_services' },
    color: '#347FB4',
    backgroundColor: palette.softSky,
  },
];

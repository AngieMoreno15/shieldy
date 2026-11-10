import { Platform } from 'react-native';

import { semanticColors, type ThemeColor } from '@/theme/colors';
import { fontFamily } from '@/theme/typography';

export const Colors = semanticColors;
export type { ThemeColor };
export const Fonts = fontFamily;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

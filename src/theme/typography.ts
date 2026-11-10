import { Platform } from 'react-native';

export const fontFamily = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'Menlo',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-rounded',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    serif: 'Georgia, serif',
    rounded: 'ui-rounded, system-ui, sans-serif',
    mono: 'ui-monospace, monospace',
  },
  default: {
    sans: 'System',
    serif: 'serif',
    rounded: 'System',
    mono: 'monospace',
  },
})!;

export const typography = {
  fontFamily,
  fontSize: {
    caption: 12,
    body: 16,
    subtitle: 20,
    title: 28,
    display: 36,
  },
  lineHeight: {
    caption: 16,
    body: 24,
    subtitle: 28,
    title: 36,
    display: 44,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;
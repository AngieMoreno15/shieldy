export const palette = {
  sky: '#DDF2FC',
  coral: '#FF756D',
  green: '#75C6A4',
  yellow: '#FFD77D',
  ink: '#263D4A',
  white: '#FFFFFF',
  canvas: '#F8FBFD',
  softSky: '#EFF8FC',
  softCoral: '#FFF0EE',
  softGreen: '#EAF7F0',
  softYellow: '#FFF7E4',
  muted: '#7A8D96',
  border: '#E1EAF0',
  darkCanvas: '#172630',
  darkSurface: '#263D4A',
  darkBorder: '#38525D',
  darkMuted: '#C1CFD5',
} as const;

export const semanticColors = {
  light: {
    text: palette.ink,
    background: palette.white,
    backgroundElement: palette.canvas,
    backgroundSelected: palette.sky,
    textSecondary: palette.muted,
  },
  dark: {
    text: palette.white,
    background: palette.darkCanvas,
    backgroundElement: palette.darkSurface,
    backgroundSelected: palette.darkBorder,
    textSecondary: palette.darkMuted,
  },
} as const;

export type ThemeColor = keyof typeof semanticColors.light &
  keyof typeof semanticColors.dark;
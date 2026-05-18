import { Platform } from 'react-native';

export const typography = {
  fonts: {
    heading: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    body: Platform.select({ ios: 'System', android: 'sans-serif' }),
    mono: Platform.select({ ios: 'Courier', android: 'monospace' }),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '600' as const,
    bold: '700' as const,
  },
};

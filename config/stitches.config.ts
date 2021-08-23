import { createCss } from '@stitches/react';
import rem from '../libs/style-utils/rem';

export const { styled, css, global, keyframes, getCssString, theme } = createCss({
  theme: {
    colors: {
      text: '#2C2738',
      primary: '#20D489',
      primaryLight: '#5c5175',
      secondary: '#E4E6EF',
      secondaryLight: '#9792a4',
      accent: '#248EEF',
      accentLight: '#5aaaf3',
      muted: '#7C9CBF',
      white: '#FFFFFF',
      shade: '#fbf9f6',
      shadeDark: '#c7cfd7',
      shadeDarker: '#b2bdc8',
      tint: '#ECF0F2',
      tintDark: '#728191',
      error: '#FF7171',
      warning: '#F2AC57',
      success: '#14A38B',
      successLight: '#19ceb0',
      successDark: '#108a76',
    },
    fontSizes: {
      base: rem(14),
      text: rem(16),
      larger: rem(18),
      title: rem(20),
      pageheading: rem(36),
    },
    space: {
      xxs: rem(4),
      xs: rem(8),
      sm: rem(12),
      md: rem(20),
      lg: rem(32),
      xl: rem(52),
      xxl: rem(84),
    },
    radii: {
      small: rem(3),
      default: rem(6),
      double: rem(12),
      triple: rem(18),
    },
  },
  media: {
    bp1: '(min-width: 768px)',
    bp2: '(min-width: 1280px)',
    bp3: '(min-width: 1366px)',
  },
  utils: {
    marginX: (_) => (value) => ({ marginLeft: value, marginRight: value }),
    marginY: (_) => (value) => ({ marginTop: value, marginBottom: value }),
    paddingX: (_) => (value) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (_) => (value) => ({ paddingTop: value, paddingBottom: value }),
  },
});

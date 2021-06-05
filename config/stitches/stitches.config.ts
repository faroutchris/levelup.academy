import { createCss } from '@stitches/react';
import rem from '../../libs/style-utils/rem';

export const { styled, css, global, keyframes, getCssString, theme } = createCss({
  theme: {
    colors: {
      text: '#2C2738',
      primary: '#6B58DE',
      primaryLight: '#5c5175',
      secondary: '#756F86',
      secondaryLight: '#9792a4',
      accent: '#248EEF',
      accentLight: '#5aaaf3',
      muted: '#7C9CBF',
      white: '#FFFFFF',
      shade: '#eaedf0',
      tint: '#ECF0F2',
      tintDark: '#728191',
      error: '#FF7171',
      warning: '#F2AC57',
      success: '#14A38B',
    },
    sizes: {
      $base: rem(14),
      $menu: rem(18),
      $pageheading: rem(34),
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

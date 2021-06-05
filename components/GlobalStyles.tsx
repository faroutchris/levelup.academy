import { global } from '../config/stitches/stitches.config';
import rem from '../libs/style-utils/rem';

const globalStyles = global({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  '*:': {
    margin: 0,
    padding: 0,
  },
  /* Remove default padding */
  'ul, ol': {
    padding: 0,
    listStyle: 'none',
  },

  /* Remove default margin */
  'body,h1,h2,h3,h4,p,ul[class],ol[class],li,figure,figcaption,blockquote,dl,dd': {
    margin: 0,
  },

  'html,body': {
    fontSize: '14px',
    fontWeight: '500',
  },

  body: {
    minHeight: '100vh',
    scrollBehavior: 'smooth',
    textRendering: 'optimizeSpeed',
    lineHeight: 1.5,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '$shade',
    color: '$text',
  },

  a: {
    textDecorationSkipInk: 'auto',
    transition: 'color 0.1s ease-in-out',
  },

  img: {
    maxWidth: '100%',
    display: 'block',
  },

  'input,button,textarea,select': {
    font: 'inherit',
  },

  '@media (prefers-reduced-motion: reduce)': {
    '*': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
      body: {
        scrollBehavior: 'auto',
      },
    },
  },
});

export default globalStyles;

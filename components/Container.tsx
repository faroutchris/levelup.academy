import { styled } from '../config/stitches.config';

const Container = styled('div', {
  maxWidth: '100%',
  paddingX: '$md',
  marginX: 'auto',
  '@bp2': {
    maxWidth: '1366px',
  },
});

export default Container;

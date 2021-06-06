import { styled } from '../config/stitches.config';

const Tab = styled('a', {
  color: '$muted',
  paddingX: '$md',
  paddingY: '$xs',
  borderRadius: '$default',
  cursor: 'pointer',

  '&:hover': {
    color: '$primary',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$white',
        color: '$primary',
      },
    },
  },
});

export default Tab;

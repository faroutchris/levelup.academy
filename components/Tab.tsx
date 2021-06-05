import { styled } from '../config/stitches/stitches.config';

const Tab = styled('a', {
  color: '$muted',
  paddingX: '$md',
  paddingY: '$xs',
  borderRadius: '$default',
  marginRight: '$sm',
  cursor: 'pointer',

  '&:hover': {
    color: '$primary',
  },

  variants: {
    active: {
      ['true']: {
        backgroundColor: '$white',
        color: '$primary',
      },
    },
  },
});

export default Tab;

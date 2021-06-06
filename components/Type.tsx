import { styled } from '../config/stitches.config';

const Type = styled('span', {
  fontWeight: 500,

  variants: {
    size: {
      base: {
        fontSize: '$base',
      },
      title: {
        fontSize: '$title',
      },
      pageheading: {
        fontSize: '$pageheading',
      },
    },
    color: {
      muted: {
        color: '$muted',
      },
    },
  },
});

export default Type;

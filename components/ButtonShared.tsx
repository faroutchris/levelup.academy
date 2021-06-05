import rem from '../libs/style-utils/rem';

export default {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: '0',
  color: '$white',
  borderRadius: '$default',
  fontSize: rem(15),
  fontWeight: 500,
  height: rem(44),
  paddingX: rem(24),
  transition: 'background 0.1s ease-in',
  [`& + button`]: {
    marginLeft: '$sm',
  },
  [`& + a`]: {
    marginLeft: '$sm',
  },

  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
        '&:hover': {
          backgroundColor: '$primaryLight',
        },
        '&:active': {
          backgroundColor: '$primaryLight',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        '&:hover': {
          backgroundColor: '$secondaryLight',
        },
        '&:active': {
          backgroundColor: '$secondaryLight',
        },
      },
      accent: {
        backgroundColor: '$success',
        '&:hover': {
          backgroundColor: '$accentLight',
        },
        '&:active': {
          backgroundColor: '$accentLight',
        },
      },
    },
  },
};

import rem from '../libs/style-utils/rem';

export default {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: '0',
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
        color: '$white',
        backgroundColor: '$primary',
        '&:hover': {
          backgroundColor: '$primaryLight',
        },
        '&:active': {
          backgroundColor: '$primaryLight',
        },
      },
      secondary: {
        color: '$white',
        backgroundColor: '$secondary',
        '&:hover': {
          backgroundColor: '$secondaryLight',
        },
        '&:active': {
          backgroundColor: '$secondaryLight',
        },
      },
      success: {
        color: '$white',
        backgroundColor: '$success',
        '&:hover': {
          backgroundColor: '$successDark',
        },
        '&:active': {
          backgroundColor: '$successDark',
        },
      },
      link: {
        color: '$text',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$tint',
        },
        '&:active': {
          backgroundColor: '$tint',
        },
      },
    },
  },
};

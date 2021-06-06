import { styled } from '../config/stitches.config';

const NavContent = styled('div', {
  display: 'flex',
  marginRight: 'auto',
  a: {
    textDecoration: 'none',
    color: '$tintDark',

    '&:hover': {
      color: '$primary',
    },
  },
});

export default NavContent;

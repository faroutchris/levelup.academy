import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';

const NavItem = styled('div', {
  marginRight: '$lg',
  transition: 'color 0.2s ease-in-out',

  a: {
    paddingY: rem(20),
  },
});

export default NavItem;

import { styled } from '../config/stitches/stitches.config';
import rem from '../libs/style-utils/rem';

const Navbar = styled('nav', {
  display: 'flex',
  gridColumnStart: 2,
  gridColumnEnd: 7,
  gridRowStart: 1,
  gridRowEnd: 1,
  width: '100%',
  height: rem(90),
  paddingX: '$lg',
  marginBottom: '$lg',
  backgroundColor: '$white',
  alignItems: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
});

export default Navbar;

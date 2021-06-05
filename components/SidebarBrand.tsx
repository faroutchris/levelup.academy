import { styled } from '../config/stitches/stitches.config';
import rem from '../libs/style-utils/rem';

const SidebarBrand = styled('div', {
  display: 'flex',
  fontSize: 'larger',
  width: '100%',
  height: rem(90),
  marginBottom: '$lg',
  backgroundColor: '$secondary',
  alignItems: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',

  a: {
    display: 'block',
    paddingX: '$lg',
    paddingY: '$lg',
    width: '100%',
    textDecoration: 'none',
    color: '$white',
    fontWeight: '400',

    '&:hover': {
      color: '$primary',
    },
  },
});

export default SidebarBrand;

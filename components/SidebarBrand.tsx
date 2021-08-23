import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';

const SidebarBrand = styled('div', {
  display: 'flex',
  fontSize: '$larger',
  fontWeight: 600,
  width: '100%',
  height: rem(90),
  marginBottom: '$lg',
  backgroundColor: '$white',
  paddingX: '$lg',
  alignItems: 'center',
  margin: 'auto',

  a: {
    display: 'block',
    paddingY: '$lg',
    paddingX: '$xs',
    width: '100%',
    textDecoration: 'none',
    color: '$text',
  },
});

export default SidebarBrand;

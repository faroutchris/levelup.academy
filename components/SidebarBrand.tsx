import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';

const SidebarBrand = styled('div', {
  display: 'flex',
  fontSize: '$text',
  fontWeight: 600,
  width: '100%',
  height: rem(90),
  marginBottom: '$lg',
  backgroundColor: '$shadeDarker',
  alignItems: 'center',

  a: {
    display: 'block',
    paddingX: '$lg',
    paddingY: '$lg',
    width: '100%',
    textDecoration: 'none',
    color: '$text',
  },
});

export default SidebarBrand;

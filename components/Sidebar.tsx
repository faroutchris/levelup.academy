import { styled } from '../config/stitches/stitches.config';

const Sidebar = styled('div', {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 3,
  backgroundColor: '$mutedLight',
});

export default Sidebar;

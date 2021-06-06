import { styled } from '../config/stitches.config';

const Sidebar = styled('div', {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 3,
  backgroundColor: '$shadeDark',
  minHeight: '100vh',
});

export default Sidebar;

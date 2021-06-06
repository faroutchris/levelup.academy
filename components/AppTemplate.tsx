import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';

const AppTemplate = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gridTemplateRows: `${rem(90)} 1fr`,
  gap: '0px 0px',
});

export default AppTemplate;

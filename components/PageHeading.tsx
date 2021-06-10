import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';

const PageHeading = styled('div', {
  display: 'flex',
  width: '100%',
  fontSize: '$pageheading',
  alignItems: 'center',
  marginBottom: '$md',

  [`& svg`]: {
    marginRight: rem(8),
  },
});

export default PageHeading;

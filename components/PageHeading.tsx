import { styled } from '../config/stitches/stitches.config';
import rem from '../libs/style-utils/rem';
import IconCommunity from './svg/icons/IconCommunity';

const PageHeading = styled('div', {
  display: 'flex',
  width: '100%',
  fontSize: rem(24),
  alignItems: 'center',
  marginBottom: '$md',

  [`& svg`]: {
    marginRight: rem(8),
  },
});

export default PageHeading;

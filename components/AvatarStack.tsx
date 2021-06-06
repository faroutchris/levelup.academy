import { styled } from '../config/stitches.config';
import rem from '../libs/style-utils/rem';
import Avatar from './Avatar';

const AvatarStack = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'right',
  height: rem(32),
  flexGrow: 1,

  [`& > img`]: {
    width: rem(32),
    height: rem(32),
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  [`& > img:nth-child(1)`]: {
    left: rem(15),
    zIndex: 1,
  },
  [`& > img:nth-child(2)`]: {
    left: rem(30),
    zIndex: 1,
  },
  [`& > img:nth-child(3)`]: {
    left: rem(45),
    zIndex: 1,
  },
});

export default AvatarStack;

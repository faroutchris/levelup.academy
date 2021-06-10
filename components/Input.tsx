import { styled } from '../config/stitches.config';

const Input = styled('input', {
  display: 'block',
  width: '100%',
  height: 48,
  paddingX: '$sm',
  borderRadius: '$default',
  border: 0,
  boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
});

export default Input;

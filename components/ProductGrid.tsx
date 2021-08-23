import { styled } from '../config/stitches.config';

const ProductGrid = styled('div', {
  display: 'inline-grid',
  width: '100%',
  gap: '$lg',
  gridTemplateColumns: `repeat(4, 1fr)`,
});

export default ProductGrid;

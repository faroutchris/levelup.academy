import { styled } from '../config/stitches.config';

const TopicItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  padding: '$lg',
  marginLeft: '-$lg',
  marginRight: '-$lg',
  transition: 'background-color 0.18s ease-in',

  '&:last-of-type': {
    marginBottom: 0,
  },

  '&:hover': {
    backgroundColor: '$shade',
  },
});

export default TopicItem;

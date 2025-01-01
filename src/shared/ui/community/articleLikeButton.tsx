import FavoriteDefaultIcon from '~/shared/images/svg/thumb_up_default.svg';
import FavoriteFocusIcon from '~/shared/images/svg/thumb_up_focus.svg';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';

interface ArticleLikeButton {
  isFavorite?: boolean;
  isShowText?: boolean;
  likes?: number;
  onPress?: () => void;
}

export const ArticleLikeButton = ({isFavorite, isShowText, onPress, likes}: ArticleLikeButton) => {
  return (
    <StyledPressContainer onPress={onPress}>
      {isFavorite ? <FavoriteFocusIcon /> : <FavoriteDefaultIcon />}
      {isShowText && <Text size={'xs'}>좋아요</Text>}
      <Text size={'xs'}>{likes}</Text>
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

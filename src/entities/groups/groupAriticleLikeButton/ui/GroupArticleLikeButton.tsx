import {useIsLikeStatus} from '../model/useIsLikeStatus.ts';
import {useFetchArticleLike} from '../model/useFetchArticleLike.ts';
import {ReqArticleLike} from '../api/fetchPostGroupArticleLike.ts';
import {useEffect, useState} from 'react';
import {Button, Text} from '@gluestack-ui/themed';
import FavoriteDefaultIcon from '~/shared/images/svg/thumb_up_default.svg';
import FavoriteFocusIcon from '~/shared/images/svg/thumb_up_focus.svg';
import styled from 'styled-components/native';

interface GroupArticleLikeButtonProps extends ReqArticleLike {
  likes: number;
  isLikedByUser?: boolean;
}

/** ### GroupArticleLikeButton
 * #### 사용용도
 * - 기능에 대한
 */
export const GroupArticleLikeButton = ({groupsId, id, likes, isLikedByUser}: GroupArticleLikeButtonProps) => {
  const {isSuccess, postFetchLike} = useFetchArticleLike();
  const {isLike, setLikeStatus} = useIsLikeStatus(isLikedByUser);
  const [likeCount, setLikeCount] = useState<number>(likes);

  useEffect(() => {
    // 좋아요 버튼을 클릭해서 성공한 경우
    if (isSuccess) {
      setLikeCount(prev => (isLike ? prev + 1 : prev - 1));
    }
  }, [isSuccess, isLike]);

  function pressEvent() {
    setLikeStatus();
    postFetchLike(groupsId, id);
  }

  return (
    <Button
      size={'sm'}
      onPress={pressEvent}
      borderRadius={'$full'}
      variant={isLike ? 'solid' : 'outline'}
      action={'secondary'}
      backgroundColor={isLike ? '$trueGray200' : undefined}>
      <StyledBodyContainer>
        {isLike ? <FavoriteFocusIcon /> : <FavoriteDefaultIcon />}
        <StyledTextContainer>
          <Text size={'xs'}>좋아요</Text>
          <Text size={'xs'}>{likeCount}</Text>
        </StyledTextContainer>
      </StyledBodyContainer>
    </Button>
  );
};

const StyledBodyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const StyledTextContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`;

import {ArticleLikeButton} from '~/shared/ui';
import {useEffect, useState} from 'react';

interface CommentLikeButtonProps {
  likeCountPrev: number;
  isLikePrev: boolean;
  isFetchSuccess: boolean;
  onPress: () => void;
}

export const CommentLikeButton = ({likeCountPrev, isLikePrev, isFetchSuccess, onPress}: CommentLikeButtonProps) => {
  const [isLike, setLike] = useState<boolean>(isLikePrev);
  const [likeCount, setLikeCount] = useState<number>(likeCountPrev);
  useEffect(() => {
    if (isFetchSuccess) {
      setLike(prev => !prev);
      setLikeCount(prev => (isLike ? prev - 1 : prev + 1));
    }
  }, [isFetchSuccess, isLikePrev]);

  function pressEvent() {
    onPress();
  }

  return <ArticleLikeButton isShowText={true} likes={likeCount} onPress={pressEvent} isFavorite={isLike} />;
};

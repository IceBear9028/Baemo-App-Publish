import {useMutation} from '@tanstack/react-query';
import {fetchPostGroupCommentLike} from '../api/fetchPostGroupCommentLike.ts';

export function useFetchLikeGroupComment(articleId: number, commentId: number) {
  const {isPending, mutate, isSuccess} = useMutation({
    mutationFn: fetchPostGroupCommentLike,
    onSuccess: () => {},
    onError: () => {},
  });

  function commentLike() {
    mutate({postId: articleId, commentId: commentId});
  }

  return {
    commentLike,
    isSuccess,
  };
}

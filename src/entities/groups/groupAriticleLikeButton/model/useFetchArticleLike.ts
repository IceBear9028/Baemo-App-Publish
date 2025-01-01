import {useMutation} from '@tanstack/react-query';
import {fetchPostGroupArticleLike} from '~/entities/groups/groupAriticleLikeButton/api/fetchPostGroupArticleLike.ts';

export function useFetchArticleLike() {
  const {isError, isSuccess, mutate} = useMutation({
    mutationFn: fetchPostGroupArticleLike,
  });

  function postFetchLike(groupsId: number, articleId: number) {
    const request = {groupsId, id: articleId};
    mutate(request);
  }

  return {
    postFetchLike,
    isError,
    isSuccess,
  };
}

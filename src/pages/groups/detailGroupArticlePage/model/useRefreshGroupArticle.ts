import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {groupCommentListQueryKey} from '~/features/groups/groupCommentCardList';
import {detailGroupArticleQueryKey} from '~/features/groups/groupArticleContents/model/useFetchGroupArticle.ts';

export function useRefreshGroupArticle(groupsId: number, articleId: number) {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshComment() {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: [...groupCommentListQueryKey, articleId]}),
        queryClient.refetchQueries({queryKey: [...detailGroupArticleQueryKey, articleId]}),
      ]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refreshComment};
}

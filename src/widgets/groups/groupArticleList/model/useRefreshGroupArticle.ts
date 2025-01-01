import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {groupArticleListQueryKey} from '~/widgets/groups/groupArticleList';

export function useRefreshGroupArticle() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshList() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: [...groupArticleListQueryKey]})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isPending: isFetching, refreshList};
}

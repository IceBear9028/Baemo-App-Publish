import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {detailNoticeQueryKey} from '~/widgets/serviceNotice/serviceNoticeArticleContents/model/useFetchServiceNoticeArticle.ts';

export function useRefreshNoticeArticle() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshNotice() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: detailNoticeQueryKey})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refreshNotice};
}

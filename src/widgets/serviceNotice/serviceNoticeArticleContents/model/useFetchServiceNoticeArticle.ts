import {useQuery} from '@tanstack/react-query';
import {fetchGetDetailNoticeArticle} from '../api/fetchGetDetailNoticeArticle.ts';

export const detailNoticeQueryKey = ['fetchGetDetailNoticeArticle'];

export function useFetchServiceNoticeArticle(articleId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...detailNoticeQueryKey, articleId],
    queryFn: () => fetchGetDetailNoticeArticle(articleId),
    throwOnError: true,
  });

  return {
    isFetchingArticle: isFetching,
    isErrorArticle: isError,
    data,
  };
}

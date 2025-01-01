import {useQuery} from '@tanstack/react-query';
import {fetchGetDetailArticle} from '../api/fetchGetDetailArticle';

export function useFetchDetailArticle(articleId: number) {
  const {isError, isFetching, data} = useQuery({
    queryKey: ['fetchGetDetailArticle', articleId],
    queryFn: () => fetchGetDetailArticle(articleId),
  });
  return {
    isError,
    isFetching,
    data,
  };
}

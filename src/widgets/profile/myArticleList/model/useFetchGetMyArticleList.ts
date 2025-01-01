import {fetchGetMyArticle, MyArticleTimePeriod} from '../api/fetchGetMyArticle';
import {useQuery} from '@tanstack/react-query';

export function useFetchGetMyArticleList(params: MyArticleTimePeriod) {
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetMyArticle', params],
    queryFn: () => fetchGetMyArticle(params),
  });

  return {
    isFetching,
    isError,
    data,
  };
}

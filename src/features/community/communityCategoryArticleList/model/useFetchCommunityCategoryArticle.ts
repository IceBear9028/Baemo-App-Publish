import {useQuery} from '@tanstack/react-query';
import {fetchGetCommunityCategoryArticle, ArticleCommunityCategoryId} from '../api/fetchGetCommunityCategoryArticle';

export function useFetchCommunityCategoryArticle(categoryId: ArticleCommunityCategoryId) {
  const {isFetching, data, isError} = useQuery({
    queryKey: ['fetchGetCommunityCategoryArticle', categoryId],
    queryFn: () => fetchGetCommunityCategoryArticle(categoryId),
  });

  return {
    isError,
    isFetching,
    data,
  };
}

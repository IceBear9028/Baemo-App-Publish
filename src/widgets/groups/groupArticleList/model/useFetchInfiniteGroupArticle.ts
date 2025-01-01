import {useInfiniteQuery} from '@tanstack/react-query';
import {ArticleGroupCategoryId} from '~/widgets/groups/groupArticleList';
import {fetchGetGroupArticle} from '~/widgets/groups/groupArticleList/api/fetchGetGroupArticle.ts';

export const groupArticleListQueryKey = ['fetchGroupArticleList'];

const ROWS_PER_PAGE = 10;

export function useFetchInfiniteGroupArticle(categoryId: ArticleGroupCategoryId, groupsId: number) {
  const {data, refetch, isFetchingNextPage, fetchNextPage, hasNextPage, isFetched, isFetching} = useInfiniteQuery({
    queryKey: [...groupArticleListQueryKey, groupsId, categoryId],
    queryFn: ({pageParam}) => fetchGetGroupArticle(groupsId, categoryId, {page: pageParam, size: ROWS_PER_PAGE}),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지 리스트 불러오기
      const nextPage = allPages.length;

      //모임 개수가 0개, 혹은 rowsPerPage 보다 작을 경우 마지막 페이지로 인식한다.
      const lastPageCount = lastPage.length;
      return lastPageCount === 0 || lastPageCount < ROWS_PER_PAGE ? undefined : nextPage;
    },
    throwOnError: true,
  });

  return {
    data,
    isFetched,
    isFetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

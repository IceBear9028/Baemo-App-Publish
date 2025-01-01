import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchGetAllGroupList} from '~/pages/groups/allGroupListPage/api/fetchGetAllGroupList.ts';

export const allGroupListQueryKey = ['allGroupListQueryKey'];

const ROWS_PER_PAGE = 10;

export function useFetchInfiniteGroupList() {
  const {data, refetch, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching} = useInfiniteQuery({
    queryKey: [...allGroupListQueryKey],
    queryFn: ({pageParam}) => fetchGetAllGroupList({page: pageParam, size: ROWS_PER_PAGE}),
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
    groupList: data,
    refetch,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

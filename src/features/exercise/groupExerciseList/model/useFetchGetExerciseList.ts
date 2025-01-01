import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchGetGroupExerciseList} from '~/features/exercise/groupExerciseList/api/fetchGetGroupExerciseList.ts';
import {ExerciseStatus} from '~/shared/mapper/exercise';

type ExerciseFilterKey = keyof ExerciseStatus | 'ALL';

export const groupExerciseListQueryKey = ['fetchGetGroupExerciseList'];

const ROWS_PER_PAGE = 10;

export function useFetchGetExerciseList(groupId: number) {
  const {data, refetch, isFetchingNextPage, fetchNextPage, hasNextPage, isFetched, isFetching} = useInfiniteQuery({
    queryKey: [...groupExerciseListQueryKey, groupId],
    queryFn: ({pageParam}) => fetchGetGroupExerciseList(groupId, {page: pageParam, size: ROWS_PER_PAGE}),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지 리스트 불러오기
      const nextPage = allPages.length;
      console.log(nextPage);

      //모임 개수가 0개, 혹은 rowsPerPage 보다 작을 경우 마지막 페이지로 인식한다.
      const lastPageCount = lastPage.length;
      return lastPageCount === 0 || lastPageCount < ROWS_PER_PAGE ? undefined : nextPage;
    },
    /** 페이지 네이션 하면서 기존 필터의 기능이 제역할을 못해서 일단 비활성화
     select: exerciseList => {
     if (filterKey === 'ALL') {
     return exerciseList;
     } else {
     return exerciseList.filter(exercise => exercise.exerciseStatus === filterKey);
     }
     },
      **/
    throwOnError: true,
  });

  return {
    groupExerciseList: data,
    isFetched,
    isFetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

import {useQuery} from '@tanstack/react-query';
import {fetchGetExerciseMembers} from '../api/fetchGetExerciseMembers.ts';

export const exerciseMemberListQueryKey = ['fetchGetGroupMembers'];

export function useFetchGetExerciseMembers(exerciseId: number, filter: 'waiting' | 'participate' = 'participate') {
  const {isError, isFetching, data, refetch} = useQuery({
    queryKey: [...exerciseMemberListQueryKey, exerciseId, filter],
    queryFn: () => fetchGetExerciseMembers(exerciseId, filter),
    throwOnError: true,
  });

  return {
    isError,
    isFetching,
    data,
    refetch,
  };
}

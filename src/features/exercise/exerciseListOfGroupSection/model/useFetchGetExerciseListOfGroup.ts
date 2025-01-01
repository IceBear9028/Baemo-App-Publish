import {useQuery} from '@tanstack/react-query';
import {fetchGetExerciseListOfGroup} from '../api/fetchGetExerciseListOfGroup';

export const groupExerciseListQueryKey = ['groupExerciseListQueryKey'];

export function useFetchGetExerciseListOfGroup(groupsId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...groupExerciseListQueryKey, groupsId],
    queryFn: () => fetchGetExerciseListOfGroup(groupsId),
  });
  return {
    isError,
    isFetching,
    data,
  };
}

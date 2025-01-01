import {useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {groupExerciseListQueryKey} from './useFetchGetExerciseList.ts';

export function useRefreshGroupExerciseList() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: groupExerciseListQueryKey})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isPending: isFetching, refresh};
}

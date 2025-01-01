import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {groupHomeInfoQueryKey} from '~/features/groups/detailGroupsIntroduction';
import {groupExerciseListQueryKey} from '~/features/exercise/exerciseListOfGroupSection';

export function useRefreshHome() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refresh(groupsId: number) {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: [...groupHomeInfoQueryKey, groupsId]}),
        queryClient.refetchQueries({queryKey: [...groupExerciseListQueryKey, groupsId]}),
      ]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isPending: isFetching, refresh};
}

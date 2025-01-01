import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';
import {getPresentGameListQueryKey} from 'features/game/presentDetailGameList';

export function useRefreshExerciseHome(exerciseId: number) {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshList() {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: [...exerciseIntroQueryKey, exerciseId]}),
        queryClient.refetchQueries({queryKey: [...getPresentGameListQueryKey, exerciseId]}),
      ]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refreshList};
}

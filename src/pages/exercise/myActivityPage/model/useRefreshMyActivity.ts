import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {myGroupQueryKey} from '~/features/groups/myGroupsList';
import {fetchMyExerciseListQueryKey} from '~/features/exercise/myExerciseList';

export function useRefreshMyActivity() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  async function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: fetchMyExerciseListQueryKey}),
        queryClient.refetchQueries({queryKey: myGroupQueryKey}),
      ]);
    } catch (error) {
      console.log('쿼리 에러 발생');
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {refresh, isFetching};
}

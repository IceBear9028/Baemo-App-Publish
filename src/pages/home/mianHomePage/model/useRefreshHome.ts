import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {previewGroupListQueryKey} from '~/features/groups/previewGroupsList';
import {homeExerciseListQueryKey} from '~/features/exercise/homeExerciseList';
import {previewNoticeQueryKey} from "~/widgets/serviceNotice/serviceNoticeBanner/model/useFetchPreviewNotice.ts";

export function useRefreshHome() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  async function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: previewGroupListQueryKey}),
        queryClient.refetchQueries({queryKey: homeExerciseListQueryKey}),
        queryClient.refetchQueries({queryKey: previewNoticeQueryKey}),
      ]);
    } catch (error) {
      console.log('쿼리 에러 발생');
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refresh};
}

import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {applicantListQueryKey} from '~/features/groups/groupGuestList';

export function useRefreshApplicantList(groupsId: number) {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshList() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: [...applicantListQueryKey, groupsId]})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refreshList};
}

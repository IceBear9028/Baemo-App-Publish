import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {groupMemberListQueryKey} from '~/widgets/groups/groupMembersList';

export function useRefreshGroupMemberList() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  function refreshList() {
    setFetchingStatus(true);
    try {
      Promise.all([queryClient.refetchQueries({queryKey: [...groupMemberListQueryKey]})]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isPending: isFetching, refreshList};
}

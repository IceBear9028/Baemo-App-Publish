import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {notificationListQueryKey, unreadNotificationListQueryKey} from '~/features/notification/notificationList';

export function useRefreshNotification() {
  const queryClient = useQueryClient();
  const [isFetching, setFetchingStatus] = useState<boolean>(false);

  async function refresh() {
    setFetchingStatus(true);
    try {
      Promise.all([
        queryClient.refetchQueries({queryKey: notificationListQueryKey}), // No need to capture result here
        queryClient.refetchQueries({queryKey: unreadNotificationListQueryKey}),
      ]);
    } catch (error) {
      setFetchingStatus(false);
    } finally {
      setFetchingStatus(false);
    }
  }

  return {isFetching, refresh};
}

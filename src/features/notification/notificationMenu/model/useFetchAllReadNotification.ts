import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutAllReadNotification} from '../api/fetchPutAllReadNotification.ts';
import {notificationListQueryKey, unreadNotificationListQueryKey} from '~/features/notification/notificationList';

export function useFetchAllReadNotification() {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: fetchPutAllReadNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...unreadNotificationListQueryKey]});
      queryClient.invalidateQueries({queryKey: [...notificationListQueryKey]});
    },
    onError: () => {},
  });

  function allRaedNotification() {
    mutate();
  }

  return {allRaedNotification};
}

import {apiRequest} from '~/shared/fetch';
import {NotificationList, NotificationResponse} from '~/shared/mapper/notification';

interface ReqPageParam {
  page: number;
  size: number;
}

export async function fetchGetUnreadNotificationList(param: ReqPageParam) {
  const {data} = await apiRequest<NotificationResponse[], undefined, ReqPageParam>('api/notification/my/unread', 'get', undefined, param);
  return data.payload.map(response => new NotificationList(response));
}

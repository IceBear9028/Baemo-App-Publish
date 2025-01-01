import {apiRequest} from '~/shared/fetch';
import {NotificationList, NotificationResponse} from '~/shared/mapper/notification';

interface ReqPageParam {
  page: number;
  size: number;
}

export async function fetchGetAllNotificationList(param: ReqPageParam) {
  const {data} = await apiRequest<NotificationResponse[], undefined, ReqPageParam>('api/notification/my', 'get', undefined, param);
  return data.payload.map(response => new NotificationList(response));
}

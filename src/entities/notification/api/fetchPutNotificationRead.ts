import {apiRequest} from '~/shared/fetch';

export interface ReqNotificationRead {
  notificationIds: number[];
}

export async function fetchPutNotificationRead(req: ReqNotificationRead) {
  const {data} = await apiRequest('api/notification/read', 'put', req);
  return data;
}

import {apiRequest} from '~/shared/fetch';

export async function fetchPutAllReadNotification() {
  const {data} = await apiRequest('api/notification/read/all', 'put');
  return data;
}

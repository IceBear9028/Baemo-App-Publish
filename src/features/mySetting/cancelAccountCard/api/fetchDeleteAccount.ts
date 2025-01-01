import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteAccount() {
  const {data} = await apiRequest('api/users', 'delete');
  return data;
}

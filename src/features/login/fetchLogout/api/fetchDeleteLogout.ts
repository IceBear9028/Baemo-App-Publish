import {apiRequest} from '~/shared/fetch';

interface LogoutRequest {
  uniqueId: string;
  token: string;
  name: string;
  type: string;
  model: string;
  brand: string;
}

export async function fetchDeleteLogout(req: LogoutRequest) {
  const {data} = await apiRequest('api/users/device', 'delete', req);
  return data;
}

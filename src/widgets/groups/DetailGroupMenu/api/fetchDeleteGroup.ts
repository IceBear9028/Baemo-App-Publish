import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteGroup(groupId: number) {
  const {data} = await apiRequest<{}>(`api/clubs/${groupId}`, 'delete');
  return data;
}

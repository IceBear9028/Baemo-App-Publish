import {apiRequest} from '~/shared/fetch';

export async function fetchExitGroup(groupsId: number) {
  const {data} = await apiRequest(`api/clubs/exit/${groupsId}`, 'delete');
  return data;
}

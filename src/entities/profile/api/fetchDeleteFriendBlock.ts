import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteFriendBlock(relationId: number) {
  const {data} = await apiRequest(`api/relation/block/${relationId}`, 'delete');
  return data;
}

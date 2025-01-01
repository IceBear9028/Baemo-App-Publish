import {Groups, GroupsItemResponse} from '~/shared/mapper/groups';
import {apiRequest} from '~/shared/fetch';

// 수정필요
export async function fetchGetMyGroups() {
  const {data} = await apiRequest<{list: GroupsItemResponse[]}>('api/clubs/my', 'get');
  return {...data, payload: data.payload.list.map(group => new Groups(group))};
}

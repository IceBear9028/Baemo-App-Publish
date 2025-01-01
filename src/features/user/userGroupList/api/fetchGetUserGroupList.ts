import {apiRequest} from '~/shared/fetch';
import {Groups, GroupsItemResponse} from '~/shared/mapper/groups';

export async function fetchGetUserGroupList(userId: number) {
  const {data} = await apiRequest<{list: GroupsItemResponse[]}>(`api/clubs/profile/user/${userId}`, 'get');
  return data.payload.list.map(group => new Groups(group));
}

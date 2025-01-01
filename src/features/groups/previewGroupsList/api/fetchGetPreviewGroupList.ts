import {Groups, GroupsItemResponse, GroupsList_TEMP, GroupsResponse_TEMP} from '~/shared/mapper/groups';
import {apiRequest, apiRequest_TEMP} from '~/shared/fetch';

export async function fetchGetPreviewGroupList() {
  const {data} = await apiRequest<{list: GroupsItemResponse[]}>('api/clubs/preview', 'get');
  return data.payload.list.map(group => new Groups(group));
}

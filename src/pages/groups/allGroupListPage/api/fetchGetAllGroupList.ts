import {apiRequest} from '~/shared/fetch';
import {Groups, GroupsResponse} from '~/shared/mapper/groups';

interface ReqGroupParam {
  page: number;
  size: number;
}

interface GroupListResponse {
  list: GroupsResponse;
}

export async function fetchGetAllGroupList(param: ReqGroupParam) {
  const {data} = await apiRequest<GroupListResponse, undefined, ReqGroupParam>('api/clubs/home/more', 'get', undefined, param);
  return data.payload.list.map(group => new Groups(group));
}

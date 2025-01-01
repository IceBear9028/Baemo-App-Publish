import {apiRequest} from '~/shared/fetch';
import {GroupsIntro, GroupsIntroResponse} from '~/shared/mapper/groups';

export async function fetchGetGroupIntro(groupsId: number) {
  const {data} = await apiRequest<GroupsIntroResponse>(`api/clubs/${groupsId}`, 'get');
  return new GroupsIntro(data.payload);
}

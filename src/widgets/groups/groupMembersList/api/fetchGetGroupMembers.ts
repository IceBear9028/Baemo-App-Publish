import {apiRequest, apiRequest_TEMP} from '~/shared/fetch';
import {GroupMember, GroupMembersResponse} from '~/shared/mapper/groups';

export async function fetchGetGroupMembers(groupId: number) {
  const {data} = await apiRequest<{list: GroupMembersResponse[]}>(`api/clubs/members/${groupId}`, 'get');
  return data.payload.list.map(groupMember => new GroupMember(groupMember));
}

export function fetchGetGroupMembers_TEMP() {
  return new Promise<GroupMember[]>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<GroupMembersResponse[]>('memberList', 'get');
      resolve(data.map(resGroup => new GroupMember(resGroup)));
    }, 3000);
  });
}

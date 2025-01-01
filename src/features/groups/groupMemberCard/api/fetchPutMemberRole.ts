import {UserProfile} from '~/shared/mapper/userProfile';
import {GroupRoleKeys, Groups} from '~/shared/mapper/groups';
import {apiRequest} from '~/shared/fetch';

interface PutMemberRoleRequest extends Pick<UserProfile, 'userId'>, Pick<Groups, 'groupsId'> {
  groupRole: GroupRoleKeys;
}

export async function fetchPutMemberRole({userId, groupsId, groupRole}: PutMemberRoleRequest) {
  const request = {
    targetId: userId,
    updateClubsRole: groupRole,
  };
  const {data} = await apiRequest(`api/clubs/${groupsId}/role`, 'put', request);
  return data;
}

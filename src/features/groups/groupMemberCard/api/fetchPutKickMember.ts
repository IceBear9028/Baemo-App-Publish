import {apiRequest} from '~/shared/fetch';
import {UserProfile} from '~/shared/mapper/userProfile';
import {Groups} from '~/shared/mapper/groups';

interface PutKickMemberRequest extends Pick<UserProfile, 'userId'>, Pick<Groups, 'groupsId'> {}

export async function fetchPutKickMember({userId, groupsId}: PutKickMemberRequest) {
  const {data} = await apiRequest(`api/clubs/${groupsId}/kick/${userId}`, 'put');
  return data;
}

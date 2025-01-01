import {apiRequest} from '~/shared/fetch';

interface PostInviteGuestRequest {
  exerciseId: number;
  targetUserId: number;
}

export async function fetchPostInviteGuest(request: PostInviteGuestRequest) {
  const {exerciseId, targetUserId} = request;
  const {data} = await apiRequest(`api/exercises/club/${exerciseId}/member`, 'post', {targetUserId});
  return data;
}

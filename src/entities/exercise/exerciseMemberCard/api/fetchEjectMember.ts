import {apiRequest} from '~/shared/fetch';

interface ReqEjectExerciseMember {
  exerciseId: number;
  targetUserId: number;
}

export async function fetchEjectMember(request: ReqEjectExerciseMember) {
  const {exerciseId, targetUserId} = request;
  const {data} = await apiRequest(`api/exercises/${exerciseId}/member/${targetUserId}`, 'delete');
  return data;
}

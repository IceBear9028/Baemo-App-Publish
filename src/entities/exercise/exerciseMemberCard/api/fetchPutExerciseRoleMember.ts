import {apiRequest} from '~/shared/fetch';

interface ReqPutExerciseRoleMember {
  exerciseId: number;
  targetUserId: number;
  action: 'UPGRADE' | 'DOWNGRADE';
}

export async function fetchPutExerciseRoleMember(request: ReqPutExerciseRoleMember) {
  const {exerciseId, targetUserId, action} = request;
  const {data} = await apiRequest(`api/exercises/${exerciseId}/member/role/${targetUserId}`, 'put', {action});
  return data;
}

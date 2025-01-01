import {apiRequest} from '~/shared/fetch';

export interface ReqPermissionGuest {
  exerciseId: number;
  targetUserId: number;
  action: 'APPROVE' | 'REJECT';
}

export async function fetchPutPermission(req: ReqPermissionGuest) {
  const {exerciseId, targetUserId, action} = req;
  const {data} = await apiRequest(`api/exercises/${exerciseId}/member/${targetUserId}`, 'put', {action});
  return data;
}

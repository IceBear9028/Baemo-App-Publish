import {apiRequest} from '~/shared/fetch';

interface DeleteGameCourtReq {
  exerciseId: number;
  exerciseCourtId: number;
}

export async function fetchDeleteGameCourt(req: DeleteGameCourtReq) {
  const {exerciseId, exerciseCourtId} = req;
  const {data} = await apiRequest(`api/exercises/${exerciseId}/court/${exerciseCourtId}`, 'delete');
  return data;
}

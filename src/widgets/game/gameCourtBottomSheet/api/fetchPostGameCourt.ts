import {apiRequest} from '~/shared/fetch';

interface PostGameCourtReq {
  exerciseId: number;
  courtNumber: number;
}

export async function fetchPostGameCourt({exerciseId, courtNumber}: PostGameCourtReq) {
  const {data} = await apiRequest<{}, {courtNumber: number}>(`api/exercises/${exerciseId}/court`, 'post', {courtNumber});
  return data.payload;
}

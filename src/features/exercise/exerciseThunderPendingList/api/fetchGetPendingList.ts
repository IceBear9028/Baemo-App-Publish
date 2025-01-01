import {apiRequest} from '~/shared/fetch';
import {ExerciseMember, ExerciseMemberResponse} from '~/shared/mapper/exercise';

export async function fetchGetPendingList(exerciseId: number) {
  const {data} = await apiRequest<ExerciseMemberResponse[]>(`api/exercises/${exerciseId}/member/pending`, 'get');
  return data.payload.map(guest => new ExerciseMember(guest));
}

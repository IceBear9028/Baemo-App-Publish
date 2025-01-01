import {apiRequest} from '~/shared/fetch';
import {ExerciseGuestMember, ExerciseGuestMemberResponse} from '~/shared/mapper/exercise';

export async function fetchGetApplyGuestList(exerciseId: number) {
  const {data} = await apiRequest<ExerciseGuestMemberResponse[]>(`api/exercises/${exerciseId}/member/appliedGuest`, 'get');
  return data.payload.map(guest => new ExerciseGuestMember(guest));
}

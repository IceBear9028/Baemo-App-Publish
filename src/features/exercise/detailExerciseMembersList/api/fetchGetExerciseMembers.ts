import {apiRequest} from '~/shared/fetch';
import {ExerciseMember, ExerciseMemberResponse} from '~/shared/mapper/exercise';

export async function fetchGetExerciseMembers(exerciseId: number, filter: 'waiting' | 'participate') {
  if (filter === 'participate') {
    const {data} = await apiRequest<ExerciseMemberResponse[]>(`api/exercises/${exerciseId}/member/participated`, 'get');
    return data.payload.map(member => new ExerciseMember(member));
  } else {
    const {data} = await apiRequest<ExerciseMemberResponse[]>(`api/exercises/${exerciseId}/member/waiting`, 'get');
    return data.payload.map(member => new ExerciseMember(member));
  }
}

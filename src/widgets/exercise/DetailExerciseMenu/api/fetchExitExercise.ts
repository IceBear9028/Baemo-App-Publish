import {apiRequest} from '~/shared/fetch';

export async function fetchExitExercise(exerciseId: number) {
  const {data} = await apiRequest(`api/exercises/${exerciseId}/member/my`, 'delete');
  return data;
}

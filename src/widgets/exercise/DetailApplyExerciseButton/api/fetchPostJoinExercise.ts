import {apiRequest} from '~/shared/fetch';

export async function fetchPostJoinExercise(exerciseId: number) {
  const {data} = await apiRequest(`api/exercises/${exerciseId}/member`, 'post');
  return data;
}

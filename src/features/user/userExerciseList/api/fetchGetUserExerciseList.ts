import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

export async function fetchGetUserExerciseList(userId: number) {
  const {data} = await apiRequest<ExerciseItemResponse[]>(`api/exercises/user/profile/${userId}`, 'get');
  return data.payload.map(resExercise => new Exercise(resExercise));
}

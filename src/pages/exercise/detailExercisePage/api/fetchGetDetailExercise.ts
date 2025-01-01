import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseIntroResponse} from '~/shared/mapper/exercise';

export async function fetchGetDetailExercise(exerciseId: number) {
  const {data} = await apiRequest<ExerciseIntroResponse>(`api/exercises/${exerciseId}`, 'get');
  return data.payload;
}

import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

export async function fetchGetHomeExerciseList() {
  const {data} = await apiRequest<ExerciseItemResponse[]>('api/exercises/home', 'get');
  return data.payload.map(resExercise => new Exercise(resExercise));
}

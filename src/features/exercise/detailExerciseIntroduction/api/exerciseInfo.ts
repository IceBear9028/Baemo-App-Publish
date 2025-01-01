import {apiRequest} from '~/shared/fetch';
import {ExerciseIntro, ExerciseIntroResponse} from '~/shared/mapper/exercise';

export async function fetchGetExerciseIntro(exerciseId: number) {
  const {data} = await apiRequest<ExerciseIntroResponse>(`api/exercises/${exerciseId}`, 'get');
  return new ExerciseIntro(data.payload);
}

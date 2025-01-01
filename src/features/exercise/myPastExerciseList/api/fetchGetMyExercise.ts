import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';
import {apiRequest} from '~/shared/fetch';

export type MyExerciseTimePeriod = '1_week' | '1_month' | '3_month';

export async function fetchGetMyExercise() {
  const {data} = await apiRequest<ExerciseItemResponse[]>('api/exercises/my/profile', 'get');
  console.log('운동 데이터 -->', data);
  return data.payload.map(resItem => new Exercise(resItem));
}

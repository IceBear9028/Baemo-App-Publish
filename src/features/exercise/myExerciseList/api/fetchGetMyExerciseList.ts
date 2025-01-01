import {MyExercise, MyExerciseResponse} from '~/shared/mapper/exercise';
import {apiRequest} from '~/shared/fetch';

export async function fetchGetMyExerciseList() {
  const {data} = await apiRequest<MyExerciseResponse>('api/exercises/my', 'get');
  return new MyExercise(data.payload);
}

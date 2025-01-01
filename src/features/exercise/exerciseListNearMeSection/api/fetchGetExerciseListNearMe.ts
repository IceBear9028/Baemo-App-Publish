import {apiRequest} from '~/shared/fetch';
import {MyExercise, MyExerciseResponse} from '~/shared/mapper/exercise';

export async function fetchGetExerciseNearMeHead() {
  const {data} = await apiRequest<MyExerciseResponse>('exercise_head', 'get');
  return {...data, payload: new MyExercise(data.payload)};
}

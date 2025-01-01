import {Exercise} from '~/shared/mapper/exercise';
import {apiRequest_TEMP} from '~/shared/fetch';

interface ReqGetSelectedExercise {
  exerciseId: number;
}

interface PREV_SelectedExercise extends Exercise {}

export function fetchGetSelectedExercise(req: ReqGetSelectedExercise) {
  const {exerciseId} = req;
  return new Promise<PREV_SelectedExercise[]>(resolve => {
    setTimeout(async () => {
      const {data} = await apiRequest_TEMP<PREV_SelectedExercise[]>(`search_exercise?exerciseId=${exerciseId}`, 'get');
      resolve(data);
    }, 3000);
  });
}

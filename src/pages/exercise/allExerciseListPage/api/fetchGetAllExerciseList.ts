import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

interface ReqExerciseParam {
  page: number;
  size: number;
}

export async function fetchGetAllExerciseList(param: ReqExerciseParam) {
  const {data} = await apiRequest<ExerciseItemResponse[], undefined, ReqExerciseParam>('api/exercises/home/more', 'get', undefined, param);
  return data.payload.map(exercise => new Exercise(exercise));
}

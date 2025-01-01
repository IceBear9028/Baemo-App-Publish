import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

interface ReqInfiniteParam {
  page: number;
  size: number;
}

export async function fetchGetGroupExerciseList(groupId: number, param: ReqInfiniteParam) {
  const {data} = await apiRequest<ExerciseItemResponse[], undefined, ReqInfiniteParam>(
    `api/exercises/club/${groupId}`,
    'get',
    undefined,
    param,
  );
  return data.payload.map(resExercise => new Exercise(resExercise));
}

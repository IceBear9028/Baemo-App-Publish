import {apiRequest} from '~/shared/fetch';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

export async function fetchGetExerciseListOfGroup(groupsId: number) {
  const {data} = await apiRequest<ExerciseItemResponse[]>(`api/exercises/club/${groupsId}/home`, 'get');
  return data.payload.map(exercise => new Exercise(exercise));
}

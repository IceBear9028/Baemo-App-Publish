import {apiRequest} from '~/shared/fetch';
import {ExerciseStatus} from '~/shared/mapper/exercise';

interface PutChangeExerciseStatus {
  exerciseId: number;
  action: keyof ExerciseStatus; // 'PROGRESS' | 'COMPLETE';
}

export async function fetchPutExerciseStatus(request: PutChangeExerciseStatus) {
  const {exerciseId, action} = request;
  const {data} = await apiRequest(`api/exercises/${exerciseId}/status`, 'put', {action});
  return data;
}

import {apiRequest} from '~/shared/fetch';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

export interface ExerciseEditInfoStatus {
  title: string;
  description: string;
  participantLimit: number;
  location: string;
  locationDetail: LocationDetail;
  exerciseStartTime: Date | null; // '2024-07-06T09:18:01.211Z'
  exerciseEndTime: Date | null; // '2024-07-06T09:18:01.211Z'
}

export interface ReqExerciseEditInfo extends ExerciseEditInfoStatus {
  exerciseId: number;
}

export async function fetchEditThunderExercise(input: ReqExerciseEditInfo) {
  const {exerciseId, ...request} = input;
  const {data} = await apiRequest(`api/exercises/${exerciseId}`, 'put', request);
  return data;
}

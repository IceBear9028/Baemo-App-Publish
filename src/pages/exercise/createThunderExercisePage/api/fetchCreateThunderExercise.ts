import {apiFormRequest} from '~/shared/fetch';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

export interface ExerciseInfoStatus {
  title: string;
  description: string;
  participantLimit: number;
  location: string;
  locationDetail: LocationDetail;
  exerciseStartTime: Date | null; // '2024-07-06T09:18:01.211Z'
  exerciseEndTime: Date | null; // '2024-07-06T09:18:01.211Z'
}

export interface ReqExerciseInfoStatus {
  title: string;
  description: string;
  participantLimit: number;
  location: string;
  locationDetail: LocationDetail;
  exerciseStartTime: string;
  exerciseEndTime: string;
}

export async function fetchCreateThunderExercise(input: FormData) {
  const {data} = await apiFormRequest('api/exercises', 'post', input);
  return data;
}

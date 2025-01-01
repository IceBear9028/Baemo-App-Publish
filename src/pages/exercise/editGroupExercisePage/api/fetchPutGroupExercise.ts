import {apiRequest} from '~/shared/fetch';

export interface ReqEditDto {
  exerciseId: number;
  title: string;
  description: string;
  participantLimit: number;
  guestLimit: number;
  location: string;
  exerciseStartTime: string;
  exerciseEndTime: string;
}

export async function fetchPutGroupExercise(reqInput: ReqEditDto) {
  const {exerciseId, ...request} = reqInput;
  const {data} = await apiRequest(`api/exercises/club/${exerciseId}`, 'put', request);
  return data;
}

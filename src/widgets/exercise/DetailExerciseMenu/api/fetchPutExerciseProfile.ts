import {apiFormRequest} from '~/shared/fetch';

interface ReqPutExerciseProfile {
  exerciseId: number;
  formData: FormData;
}

export async function fetchPutExerciseProfile(request: ReqPutExerciseProfile) {
  const {exerciseId, formData} = request;
  const {data} = await apiFormRequest<{}>(`api/exercises/${exerciseId}/thumbnail`, 'put', formData);
  return data;
}

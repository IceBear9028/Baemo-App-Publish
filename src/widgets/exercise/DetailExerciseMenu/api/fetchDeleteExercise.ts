import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteExercise(exerciseId: number) {
  const {data} = await apiRequest<string>(`api/exercises/${exerciseId}`, 'delete');
  return data;
}

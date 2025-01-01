import {apiFormRequest} from '~/shared/fetch';

export async function fetchPostGroupExercise(form: FormData) {
  const {data} = await apiFormRequest('api/exercises/club', 'post', form);
  return data;
}

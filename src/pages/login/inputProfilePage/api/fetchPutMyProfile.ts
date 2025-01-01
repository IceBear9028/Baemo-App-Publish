import {apiFormRequest} from '~/shared/fetch';

export async function fetchPutMyProfile(form: FormData) {
  const {data} = await apiFormRequest('api/users/profile/join', 'put', form);
  return data;
}

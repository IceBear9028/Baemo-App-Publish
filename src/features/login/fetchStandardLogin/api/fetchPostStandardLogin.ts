import {apiRequest} from '~/shared/fetch';
import {MyProfile, MyProfileResponse} from '~/shared/mapper/userProfile';

export interface StandardLoginRequest {
  phone: string;
  password: string;
}

export async function fetchPostStandardLogin(req: StandardLoginRequest) {
  const {data, headers} = await apiRequest<MyProfileResponse, StandardLoginRequest>('api/users/login', 'post', req);
  return {data: new MyProfile(data.payload), headers};
}

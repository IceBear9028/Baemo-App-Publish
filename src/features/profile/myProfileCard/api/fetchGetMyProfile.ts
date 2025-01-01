import {apiRequest} from '~/shared/fetch';
import {MyProfileResponse} from '~/shared/mapper/userProfile';

export async function fetchGetMyProfile() {
  const {data} = await apiRequest<MyProfileResponse>('api/users/profile/my', 'get');
  return data.payload;
}
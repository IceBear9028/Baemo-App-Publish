import {apiRequest} from '~/shared/fetch';
import {tempUserProfileResponse} from '~/shared/mapper/userProfile';

export async function fetchGetUserProfile(userId: number) {
  const {data} = await apiRequest<tempUserProfileResponse>(`api/users/profile/${userId}`, 'get');

  return data.payload;
}

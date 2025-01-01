import {MyProfileResponse} from '~/shared/mapper/userProfile';
import {apiRequest} from '~/shared/fetch';

export async function fetchTestLogin() {
  const {data, headers, request} = await apiRequest<MyProfileResponse>('oauth2/authorization/kakao', 'get');
  console.log('headers >>>>>>', headers);
  console.log('request >>>>>>', request);
  console.log('data >>>>>>', data);
}

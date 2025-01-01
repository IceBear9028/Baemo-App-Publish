import {apiRequest} from '~/shared/fetch';
import {MyProfile, MyProfileResponse} from '~/shared/mapper/userProfile';

export interface SocialLoginRequest {
  oauthId: string;
  phone: string | null;
}

export async function fetchPostSocialLogin({oauthId}: SocialLoginRequest) {
  // 2024.07.25 - 백엔드 일반로그인 작업 미완료에 따른 임시로 코드 지정
  // 아직 일반로그인 api 올라오지 않음
  const {data, headers} = await apiRequest<MyProfileResponse, Pick<SocialLoginRequest, 'oauthId'>>('api/users/social/login', 'post', {
    oauthId,
  });
  return {data: new MyProfile(data.payload), headers};
}

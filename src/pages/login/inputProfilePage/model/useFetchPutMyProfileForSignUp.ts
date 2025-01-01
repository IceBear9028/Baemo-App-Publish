import {Alert} from 'react-native';
import {useLoginNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {fetchPutMyProfile} from '../api/fetchPutMyProfile.ts';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export function useFetchPutMyProfileForSignUp() {
  const {navigateSuccessSignUp} = useLoginNavigate();
  const {getOptimizeProfileImage, resetProfileStore} = useProfileImageStore();
  const reqEditProfile = useSignUpUserInfoStore(status => status.getReqEditProfile);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPutMyProfile,
    onSuccess: () => {
      resetProfileStore();
      navigateSuccessSignUp();
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('프로필 편집 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('프로필 편집 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function updateMyProfile() {
    const formData = new FormData();
    const profileInfo = reqEditProfile();
    const profileImage = await getOptimizeProfileImage();

    formData.append('updateProfileDTO', {string: JSON.stringify(profileInfo), type: 'application/json'});

    if (profileImage) {
      formData.append('profile', {
        uri: profileImage.uri,
        type: `image/${profileImage.name.split('.')[1]}`,
        name: profileImage.name,
      });
      mutate(formData);
    } else {
      Alert.alert('프로필 사진 선택', '프로필 사진을 선택해주세요.', [{text: '확인'}]);
    }
  }

  return {
    isError,
    isPending,
    updateMyProfile,
  };
}

import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutMyProfile} from '~/pages/profile/editProfilePage/api/fetchPutMyProfile.ts';
import {myProfileQueryKey} from '~/features/profile/myProfileCard/model/useFetchGetMyProfile.ts';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {MyLevelResponse} from '~/shared/mapper/userProfile';

interface ReqModifyDto {
  realName: string;
  gender: 'M' | 'F';
  description: string;
  level: MyLevelResponse;
}

export function useFetchPutMyProfile() {
  const queryClient = useQueryClient();
  const {profileImage, resetProfileStore} = useProfileImageStore();
  const {navigateBack} = useMainNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPutMyProfile,
    onSuccess: () => {
      Alert.alert('프로필 편집', '프로필 정보가 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...myProfileQueryKey]});
            resetProfileStore();
            navigateBack();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('프로필 편집 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('프로필 편집 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function postMyProfile(updateProfileDTO: ReqModifyDto) {
    const formData = new FormData();
    formData.append('updateProfileDTO', {string: JSON.stringify(updateProfileDTO), type: 'application/json'});

    console.log('profileImage.fileName', profileImage.uri);
    console.log('profileInfo', updateProfileDTO);

    if (profileImage.fileName) {
      formData.append('profile', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
    } else {
      formData.append('profile', null);
    }

    mutate(formData);
  }

  return {
    isError,
    isPending,
    postMyProfile,
  };
}

import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useFetchPutProfile} from '../model/useFetchPutProfile.ts';
import {ProfileImageInfo} from '~/shared/selectProfileImage';
import {selectProfileImagePicker} from '~/shared/selectProfileImage/lib/selectProfileImagePicker.ts';
import {optimizeProfileImage} from '~/shared/utils';

export function useChangeProfile(exerciseId: number) {
  const [profileImage, selectProfile] = useState<ProfileImageInfo>();
  const {isPendingProfile, updateProfile} = useFetchPutProfile(exerciseId);

  function selectProfileImage() {
    selectProfileImagePicker(selectProfile);
  }

  useEffect(() => {
    if (profileImage?.uri) {
      Alert.alert('프로필이미지 변경', '운동 프로필 이미지를 변경할까요?', [
        {text: '취소'},
        {
          text: '확인',
          onPress: async () => {
            const changeProfile = await optimizeProfileImage(profileImage);
            if (changeProfile) {
              const imageType = `image/${changeProfile.name.split('.')[1]}`;
              updateProfile({fileName: changeProfile.name, type: imageType, uri: changeProfile.uri});
            }
          },
        }, // 여기에 이미지업로드 로직 추가할 것
      ]);
    }
  }, [profileImage]);

  return {
    isPendingProfile,
    selectProfileImage,
  };
}

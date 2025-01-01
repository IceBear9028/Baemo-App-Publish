import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useMainNavigate} from '~/shared/route';
import {CreateDTOInfo, fetchPostCreateGroup} from '../api/fetchPostCreateGroup.ts';
import {GroupInfo} from '~/pages/groups/createGroupPage/model/useGroupInfoStatus.ts';
import {useBackgroundImageStore} from '~/shared/selectBackgroundImage';
import {useProfileImageStore} from '~/shared/selectProfileImage';

export function useFetchCreateGroup() {
  const {navigateBack} = useMainNavigate();
  const {resetProfileStore, getOptimizeProfileImage} = useProfileImageStore();
  const {resetBackgroundStore, getOptimizeBackground} = useBackgroundImageStore();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostCreateGroup,
    onSuccess: () => {
      Alert.alert('모임 생성 성공', '모임을 생성 했습니다.', [
        {
          text: '확인',
          onPress: () => {
            resetProfileStore();
            resetBackgroundStore();
            navigateBack();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('모임 만들기 실패', `${error.response?.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임 만들기 실패', '서버에 문제가 발생했습니다. 다시 시도해주세요.', [{text: '확인'}]);
      }
    },
  });

  async function createGroup(info: GroupInfo) {
    const createDto: CreateDTOInfo = {
      clubsName: info.name,
      clubsDescription: info.intro,
      clubsLocation: info.region,
      clubsSimpleDescription: info.statusText,
    };

    const formData = new FormData();
    const convertProfile = await getOptimizeProfileImage();
    const convertBackground = await getOptimizeBackground();
    formData.append('createClubsDTO', {string: JSON.stringify(createDto), type: 'application/json'});

    if (info.profile.fileName && convertProfile?.uri) {
      formData.append('clubsProfileImage', {
        uri: convertProfile.uri,
        type: info.profile.type,
        name: info.profile.fileName,
      });
    } else {
      Alert.alert('모임 썸네일', '모임 썸네일을 선택해주세요.', [{text: '확인'}]);
      return;
    }

    if (info.background.fileName && convertBackground?.uri) {
      formData.append('clubsBackgroundImage', {
        uri: convertBackground.uri,
        type: info.background.type,
        name: info.background.fileName,
      });
    } else {
      Alert.alert('배경이미지', '배경이미지를 선택해주세요.', [{text: '확인'}]);
      return;
    }

    mutate(formData);
  }

  return {
    createGroup,
    isErrorCreate: isError,
    isPendingCreate: isPending,
  };
}

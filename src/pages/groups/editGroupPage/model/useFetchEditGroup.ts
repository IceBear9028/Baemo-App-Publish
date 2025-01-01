import {Alert} from 'react-native';
import {mainRoutePath} from '~/shared/route';
import {GroupInfo} from '../model/useGroupInfoStatus.ts';
import {EditGroupPageProps} from '../ui/EditGroupPage.tsx';
import {CommonActions} from '@react-navigation/native';
import {myGroupQueryKey} from '~/features/groups/myGroupsList';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {useBackgroundImageStore} from '~/shared/selectBackgroundImage';
import {groupHomeInfoQueryKey} from '~/features/groups/detailGroupsIntroduction';
import {UpdateDTOInfo, fetchPutUpdateGroup} from '../api/fetchPutUpdateGroup.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export function useFetchEditGroup(navigate: EditGroupPageProps, info: GroupInfo) {
  const queryClient = useQueryClient();
  const {resetProfileStore, getOptimizeProfileImage} = useProfileImageStore();
  const {resetBackgroundStore, getOptimizeBackground} = useBackgroundImageStore();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPutUpdateGroup,
    onSuccess: () => {
      // 1. navigation 의 param 값 변경
      navigate.navigation.dispatch(
        CommonActions.navigate({
          name: mainRoutePath.detailGroupsPage,
          params: {
            ...navigate.route.params,
            groupsName: info.name,
            groupsDescription: info.statusText,
            gatheringThumbnail: info.profile.uri,
            location: info.region,
          },
        }),
      );

      // 2. navigation 의 param 값 변경
      queryClient.invalidateQueries({queryKey: [...groupHomeInfoQueryKey, info.id]});
      queryClient.invalidateQueries({queryKey: myGroupQueryKey});

      // 3. 사용자에게 UI 적으로 알림
      Alert.alert('모임편집 성공', '모임정보를 변경했습니다.', [
        {
          text: '확인',
          onPress: () => {
            resetProfileStore();
            resetBackgroundStore();
            getOptimizeProfileImage();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('모임편집 실패', `${error.response?.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임편집 실패', '서버에 문제가 발생했습니다. 다시 시도해주세요.', [{text: '확인'}]);
      }
    },
  });

  async function editGroup() {
    const createDto: UpdateDTOInfo = {
      clubsId: info.id,
      clubsName: info.name,
      clubsDescription: info.intro,
      clubsLocation: info.region,
      clubsSimpleDescription: info.statusText,
    };

    const formData = new FormData();
    const convertProfile = await getOptimizeProfileImage();
    const convertBackground = await getOptimizeBackground();
    formData.append('updateClubsDTO', {string: JSON.stringify(createDto), type: 'application/json'});

    if (info.profile.uri) {
      if (info.profile.fileName && convertProfile?.uri) {
        formData.append('clubsProfileImage', {
          uri: convertProfile.uri,
          type: info.profile.type,
          name: info.profile.fileName,
        });
      } else {
        formData.append('clubsProfileImage', null);
      }
    } else {
      Alert.alert('모임 썸네일', '모임 썸네일을 선택해주세요.', [{text: '확인'}]);
      return;
    }

    if (info.background.uri) {
      if (info.background.fileName && convertBackground?.uri) {
        formData.append('clubsBackgroundImage', {
          uri: convertBackground.uri,
          type: info.background.type,
          name: info.background.fileName,
        });
      } else {
        formData.append('clubsBackgroundImage', null);
      }
    } else {
      Alert.alert('배경이미지', '배경이미지를 선택해주세요.', [{text: '확인'}]);
      return;
    }

    mutate(formData);
  }

  return {
    editGroup,
    isErrorCreate: isError,
    isPendingCreate: isPending,
  };
}

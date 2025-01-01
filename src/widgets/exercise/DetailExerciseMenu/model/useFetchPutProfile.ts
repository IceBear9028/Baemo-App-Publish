import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {PickerImageInfo} from 'features/community/articleImagePicker';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {fetchPutExerciseProfile} from '../api/fetchPutExerciseProfile.ts';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';

export function useFetchPutProfile(exerciseId: number) {
  const queryClient = useQueryClient();
  const {resetProfileStore} = useProfileImageStore();
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchPutExerciseProfile,
    onSuccess: response => {
      console.log('response--Thumbnaiul', response);
      resetProfileStore();
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey, exerciseId]});
      Alert.alert('변경완료', '프로필 이미지를 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('변경실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('변경실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function updateProfile(image: Pick<PickerImageInfo, 'uri' | 'type' | 'fileName'>) {
    console.log('이미지 변경', image);
    if (image.uri && image.type && image.fileName) {
      const formData = new FormData();
      formData.append('thumbnail', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      mutate({exerciseId, formData});
    } else {
      Alert.alert('문제발생', '이미지 선택에 문제가 발생했습니다.', [{text: '확인'}]);
    }
  }

  return {
    isPendingProfile: isPending,
    isErrorProfile: isError,
    updateProfile,
  };
}

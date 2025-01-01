import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useMainNavigate} from '~/shared/route';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {useThunderExerciseStore} from '../model/useThunderExerciseStore.ts';
import {fetchCreateThunderExercise} from '../api/fetchCreateThunderExercise.ts';

export function useFetchPostThunderExercise() {
  const {navigateBack} = useMainNavigate();
  const {profileImage, resetProfileStore, getOptimizeProfileImage} = useProfileImageStore();
  const {resetStatus, getStatus} = useThunderExerciseStore(store => ({
    resetStatus: store.resetStatus,
    getStatus: store.getStatus,
  }));
  const {isPending, mutateAsync} = useMutation({
    mutationFn: fetchCreateThunderExercise,
    onSuccess: response => {
      resetStatus();
      navigateBack();
      resetProfileStore();
      Alert.alert('번개운동 생성', '번개 운동을 생성했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동생성 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동생성 실패', `${error}`, [{text: '확인'}]);
      }
    },
  });

  async function createExercise() {
    const formData = new FormData();
    const data = getStatus();
    const optimizeImage = await getOptimizeProfileImage();

    formData.append('createDTO', {string: JSON.stringify(data), type: 'application/json'});

    if (profileImage.fileName && optimizeImage?.uri) {
      formData.append('thumbnail', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
      await mutateAsync(formData);
    } else {
      // Alert.alert('프로필이미지', '프로필이미지를 선택해주세요.', [{text: '확인'}]);
      formData.append('thumbnail', null);
      // console.log(`final formdata: ${JSON.stringify(data)}`);
      await mutateAsync(formData);
      return;
    }
  }

  return {
    createExercise,
    isPendingExercise: isPending,
  };
}

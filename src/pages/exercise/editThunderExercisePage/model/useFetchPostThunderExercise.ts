import {useMainNavigate} from '~/shared/route';
import {useThunderExerciseStore} from '~/pages/exercise/createThunderExercisePage/model/useThunderExerciseStore.ts';
import {useMutation} from '@tanstack/react-query';
import {fetchCreateThunderExercise} from '~/pages/exercise/createThunderExercisePage/api/fetchCreateThunderExercise.ts';
import {useProfileImageStore} from '~/shared/selectProfileImage';

export function useFetchPostThunderExercise() {
  const {navigateBack} = useMainNavigate();
  const {profileImage, resetProfileStore} = useProfileImageStore();
  const {status, reset} = useThunderExerciseStore(store => ({
    status: store.status,
    reset: store.resetStatus,
    errors: store.errors,
  }));
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchCreateThunderExercise,
    onSuccess: response => {
      console.log(response);
      reset();
      navigateBack();
    },
  });

  function createExercise() {
    const formData = new FormData();
    formData.append('createDTO', {string: JSON.stringify(status), type: 'application/json'});

    // 프로필 이미지 선택 시 추가
    if (profileImage.fileName) {
      formData.append('thumbnail', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
    }
    mutate(formData);
  }
}

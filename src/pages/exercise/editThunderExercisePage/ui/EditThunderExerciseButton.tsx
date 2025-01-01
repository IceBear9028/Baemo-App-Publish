import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {fetchEditThunderExercise} from '../api/fetchEditThunderExercise.ts';
import {useEditThunderExerciseStore} from '../model/useEditThunderExerciseStore.ts';
import {mainRoutePath, RootMainStackParamList} from '~/shared/route';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';
import {CommonActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface EditThunderExerciseButtonProps extends NativeStackScreenProps<RootMainStackParamList, 'editThunderExercisePage'> {}

export const EditThunderExerciseButton = ({navigation, route}: EditThunderExerciseButtonProps) => {
  const queryClient = useQueryClient();
  const {status, errors, resetStatus, isValidExercise} = useEditThunderExerciseStore();
  const [isValid, setValid] = useState<boolean>(() => isValidExercise());
  const {isPending, mutate} = useMutation({
    mutationFn: fetchEditThunderExercise,
    onSuccess: () => {
      // 1. 쿼리 상태 초기화
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey, route.params.exerciseId]});

      // 2. navigation 의 param 값 변경
      navigation.dispatch(
        CommonActions.navigate({
          name: mainRoutePath.detailExercisePage,
          params: {
            ...route.params,
            name: status.title,
          },
        }),
      );
      // 3. 전역상태 초기화
      resetStatus();

      // 4. UI 로 번개운동 편집 확인
      Alert.alert('번개운동 편집', '번개 운동을 편집했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('운동편집 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('운동편집 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function editExercise() {
    const req = {...status, exerciseId: route.params.exerciseId};
    mutate(req);
  }

  useEffect(() => {
    console.log('에러 메시지', errors, status);
    setValid(() => isValidExercise());
  }, [status]);

  return (
    <Button variant={'link'} isDisabled={!isValid} onPress={editExercise}>
      {isPending ? <ButtonSpinner /> : <ButtonText>변경하기</ButtonText>}
    </Button>
  );
};

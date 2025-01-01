import {Alert} from 'react-native';
import {mainRoutePath} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Groups} from '~/shared/mapper/groups';
import {PutExerciseEditInfoStatus} from './useEditGroupExerciseStatus.ts';
import {EditGroupExercisePageProps} from '../ui/EditGroupExercisePage.tsx';
import {fetchPutGroupExercise, ReqEditDto} from '../api/fetchPutGroupExercise.ts';
import {CommonActions} from '@react-navigation/native';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';

export interface ValidEditDTO extends PutExerciseEditInfoStatus {
  startTime: Date;
  endTime: Date;
  group: Groups;
}

export function useFetchPutGroupExercise(navigate: EditGroupExercisePageProps) {
  const queryClient = useQueryClient();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPutGroupExercise,
    onSuccess: (_, prevStatus) => {
      // 1. 운동관련 & 상세글 쿼리 리셋
      queryClient.invalidateQueries({queryKey: [...exerciseIntroQueryKey, prevStatus.exerciseId]});

      // 2. navigation 의 param 값 변경
      navigate.navigation.dispatch(
        CommonActions.navigate({
          name: mainRoutePath.detailExercisePage,
          params: {
            ...navigate.route.params,
            name: prevStatus.title,
          },
        }),
      );

      // 3. 성공 알림 메시지 표시
      Alert.alert('모임운동 변경', '모임운동을 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('모임운동 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('모임운동 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function postExercise(info: ValidEditDTO) {
    const editDto: ReqEditDto = {
      exerciseId: Number(info.exerciseId),
      title: info.name,
      description: info.intro,
      participantLimit: Number(info.headCount),
      guestLimit: Number(info.guestHeadCount),
      location: info.location,
      exerciseStartTime: info.startTime.toISOString(),
      exerciseEndTime: info.endTime.toISOString(),
    };
    mutate(editDto);
  }

  return {
    isErrorExercise: isError,
    isPendingExercise: isPending,
    postExercise,
  };
}

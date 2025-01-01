import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchEjectMember} from '~/entities/exercise/exerciseMemberCard/api/fetchEjectMember.ts';
import {Alert} from 'react-native';
import {exerciseMemberListQueryKey} from '~/features/exercise/detailExerciseMembersList';

export function useFetchEjectExerciseMember() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchEjectMember,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: exerciseMemberListQueryKey});
      Alert.alert('맴버 방출', '운동에서 해당맴버를 방출했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('맴버 방출', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('맴버 방출', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function ejectMember(exerciseId: number, targetUserId: number) {
    Alert.alert('맴버 방출', '선택한 인원을 운동에서 방출할까요?', [
      {text: '취소'},
      {text: '확인', onPress: () => mutate({exerciseId, targetUserId})},
    ]);
  }

  return {
    isPending,
    ejectMember,
  };
}

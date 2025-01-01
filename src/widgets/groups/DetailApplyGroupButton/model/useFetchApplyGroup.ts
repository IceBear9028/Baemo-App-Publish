import {useMutation} from '@tanstack/react-query';
import {fetchPostJoinClub} from '../api/fetchPostJoinClub.ts';
import {Alert} from 'react-native';

export function useFetchApplyGroup(groupId: number) {
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchPostJoinClub,
    onSuccess: response => {
      Alert.alert('모임 신청', '모임을 신청 했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.code) {
        Alert.alert('모임 신청', `${error.response?.data.code}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임 신청', '모임신청에 실패 했습니다.', [{text: '확인'}]);
      }
    },
  });

  function applyGroup() {
    mutate(groupId);
  }

  return {
    isPendingApply: isPending,
    isErrorApply: isError,
    applyGroup,
  };
}

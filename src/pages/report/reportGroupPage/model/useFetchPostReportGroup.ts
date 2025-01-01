import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {fetchPostReportGroup, ReqReportByGroup} from '~/pages/report/reportGroupPage/api/fetchPostReportGroup.ts';

export interface reportGroupCreateDto {
  groupsId: number;
  reasons: string[];
  description: string;
}

export function useFetchPostReportGroup() {
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostReportGroup,
    onSuccess: () => {
      Alert.alert('모임신고', '모임의 신고가 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigateBack();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('모임운동 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('모임운동 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  function postReportGroup({groupsId, reasons, description}: reportGroupCreateDto) {
    const createDto: ReqReportByGroup = {
      clubId: groupsId,
      reasons,
      description,
    };
    mutate(createDto);
  }

  return {
    isPendingReportGroup: isPending,
    postReportGroup,
  };
}

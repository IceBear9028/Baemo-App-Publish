import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {fetchPostReportUser, ReqReportByUser} from '~/pages/report/reportUserPage/api/fetchPostReportUser.ts';

export interface reportUserCreateDto {
  userId: number;
  reasons: string[];
  description: string;
}

export function useFetchPostReportUser() {
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostReportUser,
    onSuccess: () => {
      Alert.alert('유저신고', '유저 신고가 완료되었습니다.', [
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
        Alert.alert('유저신고 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('유저신고 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  function postReportUser({userId, reasons, description}: reportUserCreateDto) {
    const createDto: ReqReportByUser = {
      targetUserId: userId,
      reasons,
      description,
    };
    mutate(createDto);
  }

  return {
    isPendingReportGroup: isPending,
    postReportUser,
  };
}

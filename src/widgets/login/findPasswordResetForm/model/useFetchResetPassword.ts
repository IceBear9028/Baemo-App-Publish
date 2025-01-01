import {useMutation} from '@tanstack/react-query';
import {fetchPutResetPassword, ReqResetPassword} from '../api/fetchPutResetPassword';
import {useLoginNavigate} from '~/shared/route';
import {Alert} from 'react-native';
import {AxiosError} from 'axios';
import {CommonRes} from '~/shared/fetch';

export function useFetchResetPassword() {
  const {navigateLogin} = useLoginNavigate();
  const {isPending, isError, mutate} = useMutation({
    mutationFn: fetchPutResetPassword,
    onSuccess: data => {
      console.log('비밀번호 변경 -->', data);
      Alert.alert('비밀번호 변경 완료', '비밀번호가 변경되었습니다.\n다시 로그인해주세요.', [
        {
          text: '확인',
          onPress: () => navigateLogin(),
          style: 'default',
        },
      ]);
    },
    onError: (error: AxiosError<CommonRes<unknown>>) => {
      console.log('비밀번호변경실패 -->', error.response?.data);
      Alert.alert('문제 발생', '다시 시도해주세요.', [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
  });

  function fetchResetPassword(phone: string, password: string) {
    const request: ReqResetPassword = {phone, password};
    mutate(request);
  }

  return {
    isPendingReset: isPending,
    isErrorReset: isError,
    fetchResetPassword,
  };
}

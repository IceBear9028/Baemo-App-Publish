import {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useLoginNavigate} from '~/shared/route';
import {fetchPostFindPasswordAuthCode} from '../api/fetchPostFindPasswordAuthCode.ts';
import {CommonRes} from '~/shared/fetch';

export function useFetchFindPasswordAuthCode(phone: string, remainTime: number) {
  const {navigateFindPasswordReset} = useLoginNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostFindPasswordAuthCode,
    onSuccess: data => {
      console.log('비밀번호 인증코드 결과 -->', data);
      navigateFindPasswordReset(phone);
    },
    onError: (error: AxiosError<CommonRes<unknown>>) => {
      const resCode = error.response ? error.response.data.code : 'none';
      if (['COMMON-01', 'AUTH-02'].includes(resCode)) {
        Alert.alert('코드 불일치', '인증코드가 올바르지 않습니다.', [
          {
            text: '확인',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('문제 발생', '다시 시도해주세요.', [
          {
            text: '확인',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      }
    },
  });
  function checkPhone(phone: string, code: string) {
    if (code.length && remainTime) {
      const request = {
        phone: phone,
        authenticationCode: code,
      };
      mutate(request);
    } else {
      Alert.alert('인증시간 초과', '우측 중간의 재인증 버튼을 클릭해주세요.', [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  }

  return {
    isErrorAuth: isError,
    isPendingAuth: isPending,
    checkPhone,
  };
}

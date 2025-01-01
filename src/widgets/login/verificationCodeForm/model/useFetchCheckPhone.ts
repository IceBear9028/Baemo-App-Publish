import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useLoginNavigate} from '~/shared/route';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {fetchCheckValidPhoneNumber} from '../api/fetchCheckValidPhoneNumber.ts';

export function useFetchCheckPhone(code: string, remainTime: number) {
  const {navigateInputUserInfoPage, navigateInputSocialUserInfoPage, navigateDuplicateAccount} = useLoginNavigate();
  const {phone, type: signUpType} = useSignUpUserInfoStore(status => status.store);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchCheckValidPhoneNumber,
    onSuccess: res => {
      // 중복 계정인지 확인
      if (res.type === 'NONE') {
        // 일반 회원가입인 경우
        if (signUpType === 'BAEMO') {
          navigateInputUserInfoPage();
        } else {
          navigateInputSocialUserInfoPage();
        }
      } else {
        navigateDuplicateAccount(res);
      }
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('', `${error.response.data.payload}`, [{text: '취소', style: 'cancel'}]);
      } else {
        Alert.alert('', '서버에 문제가 발생했습니다.', [{text: '취소', style: 'cancel'}]);
      }
    },
  });
  function checkPhone() {
    if (code.length && remainTime) {
      const request = {
        phone: phone,
        authenticationCode: code,
      };
      mutate(request);
    } else {
      Alert.alert('인증시간 초과', '우측 중간의 재인증 버튼을 클릭해주세요.', [{text: '확인', style: 'cancel'}]);
    }
  }

  return {
    isErrorCheck: isError,
    isPendingCheck: isPending,
    checkPhone,
  };
}

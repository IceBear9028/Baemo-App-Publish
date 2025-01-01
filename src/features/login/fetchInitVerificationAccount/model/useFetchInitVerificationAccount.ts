import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useLoginNavigate} from '~/shared/route';
import {fetchPostInitVerificationAccount} from '../api/fetchPostInitVerificationAccount';

export function useFetchInitVerificationAccount(phoneNumber: string, resetTime?: () => void) {
  const {navigateInputAuthNumber} = useLoginNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostInitVerificationAccount,
    onSuccess: () => {
      resetTime && resetTime();
      navigateInputAuthNumber(phoneNumber);
    },
    onError: err => {
      if (err.response?.data) {
        Alert.alert('문제 발생', `${err.response?.data.payload}`, [{text: '확인', style: 'cancel'}]);
      } else {
        Alert.alert('문제 발생', '다시 시도해주세요.', [{text: '확인', style: 'cancel'}]);
      }
    },
  });

  function initVerification() {
    mutate({phone: phoneNumber});
  }

  return {
    isErrorInit: isError,
    isPendingInit: isPending,
    initVerification,
  };
}

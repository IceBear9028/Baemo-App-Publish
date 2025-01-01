import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useLoginNavigate} from '~/shared/route';
import {fetchInitValidPhoneNumber} from '../api/fetchInitValidPhoneNumber';

export function useFetchInitFindPassword(phone: string, resetTime?: () => void) {
  const {navigateFindPasswordAuthCode} = useLoginNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchInitValidPhoneNumber,
    onSuccess: () => {
      resetTime && resetTime();
      navigateFindPasswordAuthCode(phone);
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
    mutate({phone: phone});
  }

  return {
    isErrorCheck: isError,
    isPendingCheck: isPending,
    initVerification,
  };
}

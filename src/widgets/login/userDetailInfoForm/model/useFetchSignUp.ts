import {useMutation} from '@tanstack/react-query';
import {fetchPostNormalSignUp} from '../api/fetchPostSignUp.ts';
import {useLoginNavigate} from '~/shared/route';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {Alert} from 'react-native';

export function useFetchSignUp() {
  const {navigateInputProfile} = useLoginNavigate();
  const {userInfo, isValid, request} = useSignUpUserInfoStore(state => ({
    userInfo: state.store,
    isValid: state.isValidInfo(),
    request: state.getReqSignUpUserInfo(),
  }));
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostNormalSignUp,
    onSuccess: () => {
      navigateInputProfile();
    },
    onError: (err, jj) => {
      if (err.response?.data) {
        Alert.alert('회원가입 실패', `${err.response.data.payload}`, [{text: '확인', onPress: () => {}, style: 'cancel'}]);
      } else {
        Alert.alert('문제 발생', '다시 시도해주세요.', [{text: '확인', onPress: () => {}, style: 'cancel'}]);
      }
    },
  });

  function fetchSignUp() {
    console.log('request', userInfo);
    console.log('isValid', isValid);
    if (isValid) {
      mutate(request);
    }
  }

  return {
    isErrorSignUp: isError,
    isPendingSignUp: isPending,
    fetchSignUp,
  };
}

import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useLoginNavigate} from '~/shared/route';
import {fetchPostSocialSignUp} from '../api/fetchPostSocialSignUp.ts';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export function useFetchSocialSignUp() {
  const {navigateInputProfile} = useLoginNavigate();
  const {userInfo, isValid, request} = useSignUpUserInfoStore(state => ({
    userInfo: state.store,
    isValid: state.isValidSocialInfo(),
    request: state.getReqSocialSignUpUserInfo(),
  }));
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostSocialSignUp,
    onSuccess: () => {
      navigateInputProfile();
    },
    onError: (err, jj) => {
      if (err.response?.data) {
        Alert.alert('문제 발생', `${err.response.data.payload}`, [{text: '확인', onPress: () => {}, style: 'cancel'}]);
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

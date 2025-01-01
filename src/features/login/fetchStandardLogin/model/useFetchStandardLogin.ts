import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useAuthControl, useMyProfileStore} from '~/shared/authentication';
import {fetchPostStandardLogin, StandardLoginRequest} from '../api/fetchPostStandardLogin.ts';

export const useFetchStandardLogin = () => {
  const {activeAuth} = useAuthControl();
  const updateMyProfile = useMyProfileStore(store => store.setMyProfile);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostStandardLogin,
    onSuccess: data => {
      const authToken = data.headers.authorization;
      activeAuth({authorization: authToken});
      updateMyProfile(data.data);
    },
    onError: error => {
      const errorCode = ['AUTH-02', 'AUTH-01'];
      if (error.response?.data && errorCode.includes(error.response.data.code)) {
        Alert.alert('로그인 오류', '아이디, 혹은 비밀번호가 틀립니다.', [{text: '확인', style: 'cancel'}]);
      } else {
        Alert.alert('문제 발생', '예상치 못한 문제가 발생했습니다.', [{text: '확인', style: 'cancel'}]);
      }
    },
  });

  function fetchStandardLogin(req: StandardLoginRequest) {
    mutate(req);
  }

  return {
    isErrorStandard: isError,
    isPendingStandard: isPending,
    fetchStandardLogin,
  };
};

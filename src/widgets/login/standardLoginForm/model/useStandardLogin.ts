import {useState} from 'react';
import {useFetchStandardLogin} from '~/features/login/fetchStandardLogin';

export function useStandardLogin() {
  const {isPendingStandard, fetchStandardLogin} = useFetchStandardLogin();
  const [phone, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function fetchLogin() {
    fetchStandardLogin({phone, password});
  }
  return {
    isPending: isPendingStandard,
    status: {phone, password},
    setPassword,
    setPhoneNumber,
    fetchLogin,
  };
}

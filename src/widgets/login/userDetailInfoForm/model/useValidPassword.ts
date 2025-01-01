import {useEffect, useState} from 'react';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {validatePasswordMessage} from '~/shared/utils';

export function useValidPassword() {
  const {password, setValidPassword} = useSignUpUserInfoStore(prev => ({
    password: prev.store.password,
    setValidPassword: prev.setValidPassword,
  }));
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordConfirm, setPwConfirm] = useState<string>('');
  const isValidPassword = !!errorMessage.length;

  function setConfirmPassword(pw: string) {
    setPwConfirm(() => pw);
  }

  useEffect(() => {
    const isValid = !validatePasswordMessage(passwordConfirm, password);
    setErrorMessage(() => validatePasswordMessage(passwordConfirm, password));
    setValidPassword(isValid);
  }, [password, passwordConfirm]);

  return {
    password,
    passwordConfirm,
    isValidPassword,
    setConfirmPassword,
    errorMessage,
  };
}

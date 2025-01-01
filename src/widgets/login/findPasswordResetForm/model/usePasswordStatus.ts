import {useEffect, useState} from 'react';
import {validatePasswordMessage} from '~/shared/utils';

export function usePasswordStatus() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isValidPassword = !!errorMessage.length;

  useEffect(() => {
    setErrorMessage(() => validatePasswordMessage(confirmPassword, password));
  }, [password, confirmPassword]);

  return {
    password,
    confirmPassword,
    isValidPassword,
    setConfirmPassword,
    setPassword,
    errorMessage,
  };
}

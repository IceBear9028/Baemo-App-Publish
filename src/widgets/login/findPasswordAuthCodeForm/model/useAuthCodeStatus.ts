import {useState} from 'react';

export function useAuthCodeStatus() {
  const [authCode, setCode] = useState<string>('');
  const isAuthCode = authCode.length === 6;
  function setCodeStatus(input: string) {
    setCode(input);
  }

  return {
    authCode,
    isAuthCode,
    setCodeStatus,
  };
}

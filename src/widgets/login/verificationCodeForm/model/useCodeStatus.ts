import {useState} from 'react';

/** ### useCodeStatus()
 * - 인증코드 입력 및 변경
 */
export function useCodeStatus() {
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

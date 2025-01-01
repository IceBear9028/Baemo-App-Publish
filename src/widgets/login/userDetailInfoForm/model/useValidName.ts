import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useEffect, useState} from 'react';

export function useValidName() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {name, setName, setValidName} = useSignUpUserInfoStore(status => ({
    name: status.store.name,
    setName: status.setName,
    setValidName: status.setValidName,
  }));
  const store = useSignUpUserInfoStore(store => store.store);
  const validTable = useSignUpUserInfoStore(store => store.validTable);
  const isValidName = !!errorMessage.length;

  console.log('실제값', store);
  console.log('유효성검증값', validTable);

  function validateName(name: string) {
    const koreanRegex = /^[가-힣]+$/; // 한글만 허용하는 정규식
    if (name.length < 2 || name.length >= 10) {
      return '* 최소 2글자 이상, 10글자 이하여야 합니다. \n* 이름은 한글로만 작성해야 합니다.';
    }
    if (!koreanRegex.test(name)) {
      return '* 이름은 한글로만 작성해야 합니다.';
    }
    return '';
  }

  function changeName(input: string) {
    setName(input);
  }

  useEffect(() => {
    const isValid = !validateName(name).length;
    setValidName(isValid);
    setErrorMessage(() => validateName(name));
  }, [errorMessage, name]);

  return {
    name,
    changeName,
    errorMessage,
    isValidName,
  };
}

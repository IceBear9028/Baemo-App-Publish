import {useEffect, useState} from 'react';

export function useFindPasswordInfoForm() {
  const [phone, setPhone] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isValidPhone = !!errorMessage.length;

  function validatePhoneNumber(number: string) {
    const phoneRegex = /^[0-9]+$/;
    if (number.length && !phoneRegex.test(number)) {
      return '숫자만 입력할 수 있습니다.';
    }
    if (number.length !== 11) {
      return '* 번호를 확인해주세요. \n* 휴대폰번호만(010) 등록할 수 있습니다.';
    }
    if (!number.startsWith('010')) {
      return '* 휴대폰 번호만 등록할 수 있습니다.';
    }
    return '';
  }

  function editPhone(input: string) {
    setPhone(input);
  }

  useEffect(() => {
    setErrorMessage(() => validatePhoneNumber(phone));
  }, [phone]);

  return {
    phone,
    editPhone,
    errorMessage,
    isValidPhone,
  };
}

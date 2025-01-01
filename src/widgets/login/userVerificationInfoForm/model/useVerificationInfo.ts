import {useEffect, useState} from 'react';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export function useVerificationInfo() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {store, setPhone} = useSignUpUserInfoStore();
  const {phone} = store;
  const isValidPhone = !!errorMessage.length;

  /** ### convertToInternational()
   * 010 으로 시작하는 번호를 국제번호로 변환하는 함수
   */
  function convertToInternational(phoneNumber: string) {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (cleanedPhone.startsWith('010')) {
      return `+82${cleanedPhone.slice(1)}`;
    }
    return cleanedPhone;
  }

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
    phoneNumber: phone,
    editPhone,
    errorMessage,
    isValidPhone,
  };
}

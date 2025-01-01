import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

export function useTextLengthValidate(limitLength = 20, value = '') {
  const [textLength, setTextLength] = useState<number>(value.length);
  function checkValidate(value: string, onChange: (input: string) => void) {
    if (value.length > limitLength) {
      Alert.alert('글자 수 제한', '최대 작성할 수 있는 글자수를 넘었습니다.', [{text: '확인'}]);
      return;
    }
    setTextLength(value.length);
    onChange(value);
  }

  useEffect(() => {
    setTextLength(value.length);
  }, [value]);

  return {textLength, checkValidate};
}

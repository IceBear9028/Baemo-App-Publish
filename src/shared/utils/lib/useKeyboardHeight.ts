import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      // 키보드 높이를 state 에 저장
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      // 키보드 높이 제거 state 에 저장
      setKeyboardHeight(0);
    }

    // 키보드 높이를 가져오기 위한 event listener
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);

    // 키보드 활성화 여부를 가져오는 event listener
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  return keyboardHeight;
};

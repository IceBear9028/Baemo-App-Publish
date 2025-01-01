import {useEffect, useRef} from 'react';
import {Animated, Keyboard} from 'react-native';

/** ### useAnimatedKeyboardHeight
 * > #### 주의
 * > AndroidManifest.xml 파일에 아래와 같이 설정되어있으면 해당 Hook 은 동작하지 않음
 * > - 따라서 Android 환경이 더 중요한 경우에는 아래 Book 을 사용하지 말 것
 * > ```xml
 * > <activity
 * >    android:name=".MainActivity"
 * >    android:windowSoftInputMode="adjustNothing">
 * > </activity>
 * > ```
 */
export function useAnimatedKeyboardHeight() {
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', event => {
      Animated.timing(keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', event => {
      Animated.timing(keyboardHeight, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [keyboardHeight]);
  return keyboardHeight;
}

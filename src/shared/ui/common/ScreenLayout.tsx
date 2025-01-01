import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenLayoutType extends React.ComponentProps<typeof View> {
  style?: ViewStyle;
  isNativeHeaderActivate?: boolean;
  // navigation?: any;
  // react-navigation 의 navigation 타입은 추후 지정
}

/** 모든 Screen 새로 생성 시 해당 컴포넌트로 한번 감싸야 함
 * - 주의사항
 * 1. react-navigation 의 nativeHeader 를 사용한다면 꼭 isNativeHeaderActivate = true 로 props 를 넣어야 함
 * @param {style : ViewStyle} - 스크린의 스타일을 수정할 수 있음
 * @param {isNativeHeaderActivate} - react-native 의 native header 를 사용할 경우 꼭 true 로 입력해야 함
 */
export const ScreenLayout = ({style, isNativeHeaderActivate, ...props}: ScreenLayoutType) => {
  const insets = useSafeAreaInsets();
  // react-navigation 에서 제공하는 Header 사용하면서 iphone 의 스타일이 깨지는 현상 발생
  // Header 를 사용하는 Screen 인 경우 props.isNativeHeaderActivate : true 옵션을 지정
  const baseStyle = isNativeHeaderActivate
    ? {}
    : {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      };
  const customStyle = style ? style : {};

  return (
    <View
      {...props}
      style={{
        ...baseStyle,
        ...customStyle,
        flex: 1,
        flexGrow: 1,
      }}>
      {props.children}
    </View>
  );
};

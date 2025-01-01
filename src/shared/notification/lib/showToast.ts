import Toast from 'react-native-toast-message';

interface ToastProps {
  title?: string;
  body?: string;
}

export const showToast = ({title, body}: ToastProps) => {
  Toast.show({
    type: 'defaultToast', // default (추후 추가 ex: error,custom)
    text1: title,
    text2: body,
    visibilityTime: 3000, // default
  });
};

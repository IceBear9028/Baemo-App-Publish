import Toast, {BaseToast, ToastProps} from 'react-native-toast-message';

interface FCMNotiProps extends ToastProps {
  title?: string;
  body?: string;
}

export const ToastProvider = () => {
  const toastConfig = {
    defaultToast: ({title, body, ...props}: FCMNotiProps) => (
      <BaseToast
        text1={title}
        text2={body}
        style={{borderLeftColor: '#10B981'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
        {...props}
      />
    ),
    // tomatoToast: ({ text1, props }) => (
    //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
    //     <Text>{text1}</Text>
    //     <Text>{props.uuid}</Text>
    //   </View>
    // )
  };
  return <Toast config={toastConfig} />;
};

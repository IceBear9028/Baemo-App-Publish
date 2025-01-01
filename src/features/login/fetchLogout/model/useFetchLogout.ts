import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import {fetchDeleteLogout} from '~/features/login/fetchLogout/api/fetchDeleteLogout.ts';
import {getBrand, getDeviceName, getModel, getType, getUniqueId} from 'react-native-device-info';
import {useAuthControl} from '~/shared/authentication';

export function useFetchLogout() {
  const {deactivateAuthToken} = useAuthControl();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteLogout,
    onSuccess: () => {
      deactivateAuthToken();
      Alert.alert('로그아웃 했습니다.');
    },
    onError: () => {
      deactivateAuthToken();
      Alert.alert('서버에 문제가 발생했습니다.');
    },
  });

  async function fetchLogout() {
    try {
      const brand = getBrand(); // apple samsung
      const model = getModel(); // 기종 SM-G960N or iPhone 8
      const type = await getType();
      const name = await getDeviceName();
      const uniqueId = await getUniqueId();
      const token = await messaging().getToken();
      mutate({brand, model, type, name, uniqueId, token});
    } catch (error) {
      deactivateAuthToken();
    }
  }

  return {
    isPendingLogout: isPending,
    fetchLogout,
  };
}

import {useMutation} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import {getBrand, getDeviceName, getModel, getType, getUniqueId} from 'react-native-device-info';
import {fetchPostDeviceInfo} from '../api/fetchPostDeviceInfo.ts';
import {requestUserPermission} from '../lib/requestUserPermission.ts';
import {useMessagePermissionStore} from '../model/useMessagePermissionInfoStore.ts';

export function useFetchDeviceInfo() {
  const {setPermission} = useMessagePermissionStore();
  const {mutate} = useMutation({
    mutationFn: fetchPostDeviceInfo,
    onSuccess: () => {
      setPermission({
        updateDate: new Date(),
        permission: true,
      });
    },
  });

  async function fetchMessagePermission() {
    const isPermission = await requestUserPermission();

    // 사용자가 알림을 허용하면 기기정보를 서버에 전송
    if (isPermission) {
      const brand = getBrand(); // apple samsung
      const model = getModel(); // 기종 SM-G960N or iPhone 8
      const type = await getType();
      const name = await getDeviceName();
      const uniqueId = await getUniqueId();
      const token = await messaging().getToken();
      mutate({brand, model, type, name, uniqueId, token});
    }
  }

  return {
    fetchMessagePermission,
  };
}

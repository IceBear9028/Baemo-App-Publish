import AsyncStorage from '@react-native-async-storage/async-storage';
import {MessagePermission} from '../model/useMessagePermissionInfoStore.ts';

const INFO_KEY = 'PERMISSION_INFO';

export async function setPermission(info: MessagePermission) {
  await AsyncStorage.setItem(INFO_KEY, JSON.stringify(info));
}

export async function removeDeviceInfo() {
  await AsyncStorage.removeItem(INFO_KEY);
}

export async function getPermissionInfo(): Promise<MessagePermission> {
  const prevInfo = await AsyncStorage.getItem(INFO_KEY);
  return {...JSON.parse(prevInfo || '{}')};
}

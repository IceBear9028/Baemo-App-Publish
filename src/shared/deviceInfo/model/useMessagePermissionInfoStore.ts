import {create} from 'zustand';
import {getPermissionInfo, removeDeviceInfo, setPermission} from '../lib/asyncStorageDeviceInfo.ts';

export interface MessagePermission {
  updateDate: Date | null;
  permission: boolean;
}

interface PermissionInfoStore {
  permissionInfo: MessagePermission;
  resetPermission: () => Promise<void>;
  initialPermission: () => Promise<void>;
  setPermission: (info: MessagePermission) => Promise<void>;
}

const INIT_DEVICE_INFO: MessagePermission = {
  updateDate: null,
  permission: false,
};

export const useMessagePermissionStore = create<PermissionInfoStore>((set, get) => ({
  permissionInfo: INIT_DEVICE_INFO,
  initialPermission: async () => {
    const prevInfo = await getPermissionInfo();

    /**
     * 이력정보가 존재하면 store 에 업데이트
     * 이력정보가 없으면 초기값 그대로 랜더링
     */
    if (JSON.stringify(prevInfo) !== '{}') {
      set(prev => ({...prev, permissionInfo: prevInfo}));
    }
  },
  resetPermission: async () => {
    await removeDeviceInfo();
    set(prev => ({...prev, permissionInfo: INIT_DEVICE_INFO}));
  },
  setPermission: async info => {
    await setPermission(info);
    set(prev => ({...prev, permissionInfo: info}));
  },
}));

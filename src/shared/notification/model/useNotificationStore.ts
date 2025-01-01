import {create} from 'zustand';

type NotificationStoreType = {
  hasOnMessage: boolean;
  setHasOnMessage: (onMessage: boolean) => void;
};
// 24.11.24 딥링크 v2 완성에 따라 미사용
export const useNotificationStore = create<NotificationStoreType>(set => ({
  hasOnMessage: false,
  setHasOnMessage: onMessage => set(prev => ({...prev, hasOnMessage: onMessage})),
}));

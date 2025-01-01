import {create} from 'zustand';
import {getApplyInfo, setApply} from '~/widgets/groups/DetailApplyGroupButton/lib/settingApplyInfo.ts';
import {useEffect} from 'react';

interface ApplyInfo {
  applyInfo: {[groupId: string]: boolean};
  addApplyInfoStore: (groupId: string) => Promise<void>;
  deleteApplyInfoStore: (groupId: string) => Promise<void>;
  initialApplyStore: () => Promise<void>;
}

export const useApplyInfoStore = create<ApplyInfo>((set, get) => ({
  applyInfo: {},
  deleteApplyInfoStore: async groupId => {
    const {[groupId]: removed, ...delInfo} = get().applyInfo;
    await setApply(delInfo);
    set(prev => ({...prev, applyInfo: delInfo}));
  },
  addApplyInfoStore: async groupId => {
    const updateInfo = {...get().applyInfo, [groupId]: true};
    await setApply(updateInfo);
    set(prev => ({...prev, applyInfo: updateInfo}));
  },
  initialApplyStore: async () => {
    const applyInfo = await getApplyInfo();
    set(prev => ({...prev, applyInfo: applyInfo}));
  },
}));

/** 유저가 신청한 모임들의 정보를 저장 & 삭제
 */
export function useApplyInfo() {
  const {applyInfo, addApplyInfoStore, deleteApplyInfoStore, initialApplyStore} = useApplyInfoStore();

  function addApplyInfo(groupId: number) {
    addApplyInfoStore(String(groupId));
  }

  function deleteApplyInfo(groupId: number) {
    deleteApplyInfoStore(String(groupId));
  }

  function isApplyGroup(groupId: number) {
    return !!applyInfo[String(groupId)];
  }

  useEffect(() => {
    initialApplyStore();
  }, [applyInfo]);

  return {
    isApplyGroup,
    addApplyInfo,
    deleteApplyInfo,
  };
}

import AsyncStorage from '@react-native-async-storage/async-storage';

const APPLY_KEY = 'APPLY_KEY';

interface ApplyInfo {
  [index: string]: boolean;
}

export async function setApply(info: ApplyInfo) {
  await AsyncStorage.setItem(APPLY_KEY, JSON.stringify(info));
}

export async function getApplyInfo(): Promise<ApplyInfo> {
  const prevInfo = await AsyncStorage.getItem(APPLY_KEY);
  return {...JSON.parse(prevInfo || '{}')};
}

export async function addApplyInfo(groupId: number) {
  const prevInfo = await getApplyInfo();
  await setApply({...prevInfo, [groupId]: true});
}

export async function deleteApplyInfo(groupId: number) {
  const {[groupId]: del, ...deleteInfo} = await getApplyInfo();
  await setApply(deleteInfo);
}

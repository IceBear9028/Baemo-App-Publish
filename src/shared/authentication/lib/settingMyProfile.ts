import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyProfile} from '~/shared/mapper/userProfile';

const PROFILE_TOKEN = 'PROFILE_TOKEN';

export async function setAsyncMyProfile(profile: MyProfile) {
  await AsyncStorage.setItem(PROFILE_TOKEN, JSON.stringify(profile));
}

export async function removeMyProfile() {
  await AsyncStorage.removeItem(PROFILE_TOKEN);
}

export async function getMyProfile(): Promise<MyProfile> {
  const prevData = await AsyncStorage.getItem(PROFILE_TOKEN);
  const savedObj = JSON.parse(prevData || '{}');
  return new MyProfile(savedObj);
}

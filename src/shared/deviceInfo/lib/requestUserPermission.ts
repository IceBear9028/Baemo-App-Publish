import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const prevAuthStatus = await messaging().hasPermission();
  if (prevAuthStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
    await messaging().requestPermission({providesAppNotificationSettings: true});
    return false;
  } else {
    return prevAuthStatus === messaging.AuthorizationStatus.AUTHORIZED || prevAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }
}

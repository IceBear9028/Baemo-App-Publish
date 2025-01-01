import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

export function usePrivacyPermission() {
  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (Platform.OS === 'ios' && status === 'active') {
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then(result => console.warn(result))
          .catch(error => console.warn(error));
      }
    });

    return () => {
      listener.remove();
    };
  }, []);
}

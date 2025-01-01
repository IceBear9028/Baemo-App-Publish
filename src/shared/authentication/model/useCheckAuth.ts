import {useAuthStore} from '~/shared/authentication/model/authStore.ts';
import {useEffect} from 'react';

export function useCheckAuth() {
  const {isAuth, initialAuth} = useAuthStore();
  useEffect(() => {
    initialAuth();
    console.log(isAuth);
  }, [isAuth]);

  return {isAuth};
}

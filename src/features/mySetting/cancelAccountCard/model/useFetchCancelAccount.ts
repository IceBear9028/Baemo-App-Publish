import {useMutation} from '@tanstack/react-query';
import {fetchDeleteAccount} from '~/features/mySetting/cancelAccountCard/api/fetchDeleteAccount.ts';
import {Alert} from 'react-native';
import {useAuthControl, useMyProfileStore} from '~/shared/authentication';

export function useFetchCancelAccount() {
  const {resetMyProfile} = useMyProfileStore();
  const {deactivateAuthToken} = useAuthControl();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteAccount,
    onSuccess: () => {
      Alert.alert('회원탈퇴', '회원탈퇴가 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            resetMyProfile();
            deactivateAuthToken();
          },
          style: 'cancel',
        },
      ]);
    },
    onError: () => {
      Alert.alert('회원탈퇴', '예상치 못한 문제가 발생했습니다.', [{text: '확인', style: 'cancel'}]);
    },
  });

  function cancelAccount() {
    Alert.alert('회원탈퇴', '작성한 모든 활동이 삭제됩니다.\n정말로 탈퇴하시겠습니까?', [
      {text: '취소', onPress: () => {}, style: 'cancel'},
      {text: '확인', onPress: () => mutate(), style: 'destructive'},
    ]);
  }

  return {isPending, cancelAccount};
}

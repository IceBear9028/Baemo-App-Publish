import {Alert, TouchableOpacity} from 'react-native';
import {useLoginNavigate} from '~/shared/route';
import BackButtonIcon from '~/shared/images/svg/arrow_back.svg';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const SignupBackButton = () => {
  const {navigateLogin} = useLoginNavigate();
  const resetStore = useSignUpUserInfoStore(store => store.resetStore);
  function openAlertEvent() {
    Alert.alert('회원가입을 취소할까요?', '작성한 내용은 모두 초기화됩니다.', [
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          navigateLogin();
          resetStore();
        },
      },
    ]);
  }
  return (
    <TouchableOpacity onPress={openAlertEvent}>
      <BackButtonIcon />
    </TouchableOpacity>
  );
};

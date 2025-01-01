import BackButtonIcon from '~/shared/images/svg/arrow_back.svg';
import {Alert, TouchableOpacity} from 'react-native';
import {useLoginNavigate} from '~/shared/route';

export const InputProfilePageBackButton = () => {
  const {navigateLogin} = useLoginNavigate();

  function pressEvent() {
    Alert.alert('프로필편집', '나중에 작성할까요?', [{text: '취소'}, {text: '확인', onPress: () => navigateLogin()}]);
  }

  return (
    <TouchableOpacity onPress={pressEvent}>
      <BackButtonIcon />
    </TouchableOpacity>
  );
};

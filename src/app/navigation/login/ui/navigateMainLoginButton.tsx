import {TouchableOpacity} from 'react-native';
import {useLoginNavigate} from '~/shared/route';
import BackButtonIcon from '~/shared/images/svg/arrow_back.svg';

export const NavigateMainLoginButton = () => {
  const {navigateLogin} = useLoginNavigate();
  return (
    <TouchableOpacity onPress={navigateLogin}>
      <BackButtonIcon />
    </TouchableOpacity>
  );
};

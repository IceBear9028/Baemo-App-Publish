import {TouchableOpacity} from 'react-native';
import BtnGoogleSvg from '~/shared/images/svg/btn_google.svg';
import BtnAppleSvg from '~/shared/images/svg/btn_apple.svg';
import BtnBackArrowSvg from '~/shared/images/svg/arrow_back.svg';
import {useLoginNavigate} from '~/shared/route';

interface CommonSvgButtonProps {
  icon: any;
  onPress?: () => void;
}

interface SvgButtonProps extends Pick<CommonSvgButtonProps, 'onPress'> {}

function SvgButton({icon, onPress}: CommonSvgButtonProps) {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
}

export const GoogleButton = () => {
  const {navigateSocialLogin} = useLoginNavigate();
  function touchEvent() {
    navigateSocialLogin('https://api.baemo.co.kr/oauth2/authorization/google');
    // navigateSocialLogin('https://www.naver.com/');
  }
  return <SvgButton onPress={touchEvent} icon={<BtnGoogleSvg />} />;
};

export const AppleButton = ({onPress}: SvgButtonProps) => {
  return <SvgButton onPress={onPress} icon={<BtnAppleSvg />} />;
};

export const BackButtonIcon = ({onPress}: SvgButtonProps) => {
  return <SvgButton onPress={onPress} icon={<BtnBackArrowSvg />} />;
};

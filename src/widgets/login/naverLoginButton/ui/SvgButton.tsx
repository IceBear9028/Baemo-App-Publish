import {TouchableOpacity} from 'react-native';

interface CommonSvgButtonProps {
  icon: any;
  onPress?: () => void;
}

export function SvgButton({icon, onPress}: CommonSvgButtonProps) {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
}

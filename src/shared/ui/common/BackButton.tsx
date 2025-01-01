import {BackButtonIcon} from '~/pages/login/mainLoginPage/ui/iconButton.tsx';
import {useMainNavigate} from '~/shared/route';
import { useThunderExerciseStore } from "~/pages/exercise/createThunderExercisePage";

interface BackButtonProps {
  onPress?: () => void;
}

export const BackButton = ({onPress}: BackButtonProps) => {
  const {navigateBack} = useMainNavigate();
  const store = useThunderExerciseStore();
  function pressHandler() {
    onPress && onPress();
    store.resetStatus();
    navigateBack();
  }
  return <BackButtonIcon onPress={pressHandler} />;
};

export const BackButtonForAppLink = ({onPress}: BackButtonProps) => {
  const {navigateBackForMainTabs} = useMainNavigate();
  const store = useThunderExerciseStore();
  function pressHandler() {
    onPress && onPress();
    store.resetStatus();
    navigateBackForMainTabs();
  }
  return <BackButtonIcon onPress={pressHandler} />;
};

import {BackButtonIcon} from '~/pages/login/mainLoginPage/ui/iconButton.tsx';
import {useFetchStopGame} from '~/features/game/fetchStopGame';

interface MatchGameBackButtonProps {
  gameId: number;
}

export const MatchGameBackButton = ({gameId}: MatchGameBackButtonProps) => {
  const {stopGame} = useFetchStopGame();
  return <BackButtonIcon onPress={() => stopGame(gameId)} />;
};

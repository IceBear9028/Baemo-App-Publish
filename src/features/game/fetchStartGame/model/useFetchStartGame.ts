import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {fetchPostStartGame} from '../api/fetchPostStartGame.ts';
import {useMainNavigate} from '~/shared/route';
import {Game} from '~/shared/mapper/exercise';

export function useFetchStartGame() {
  const {navigateMatchGame} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostStartGame,
    onSuccess: (response, param) => {
      console.warn('심판됨 ㅅㅂㄹㅁ', response);
      navigateMatchGame(param.gameId);
    },
    onError: error => {
      if (error.response && error.response.data) {
        Alert.alert('에러 발생', `${error.response.data.payload}`, [{text: '확인', style: 'cancel'}]);
      } else {
        Alert.alert('에러 발생', '예상치 못한 문제가 발생했습니다.', [{text: '확인', style: 'cancel'}]);
      }
    },
  });

  function startGame(game: Game) {
    Alert.alert('심판 보기', '게임 심판을 보시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '확인', style: 'default', onPress: () => mutate(game)},
    ]);
  }

  function immediateStartGame(game: Game) {
    mutate(game);
  }

  return {isPending, startGame, immediateStartGame};
}

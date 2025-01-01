import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchStopScoreGame} from '../api/fetchStopScoreGame.ts';
import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {getGameListQueryKey} from '~/features/game/fetchGameList';

export function useFetchStopGame() {
  const queryClient = useQueryClient();
  const {resetStore} = useSpecifyTeamStore();
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchStopScoreGame,
    onSuccess: (_, gameId) => {
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, gameId]});
      resetStore();
      navigateBack();
      Alert.alert('심판 나가기', '현재 게임에서 나갔습니다.', [{text: '확인'}]);
    },
    onError: error => {
      resetStore();
      navigateBack();
      if (error.response && error.response.data.payload) {
        Alert.alert('오류 발생', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('오류 발생', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function stopGame(gameId: number) {
    Alert.alert('심판 나가기', '현재 게임이 진행중입니다.\n그래도 나갈까요?', [
      {text: '취소', style: 'cancel'},
      {text: '나가기', style: 'destructive', onPress: () => mutate(gameId)},
    ]);
  }

  return {isPending, stopGame};
}

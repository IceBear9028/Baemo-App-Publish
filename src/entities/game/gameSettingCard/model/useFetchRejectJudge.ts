import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDeleteRejectJudge} from '../api/fetchDeleteRejectJudge.ts';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {getGameListQueryKey} from '~/features/game/fetchGameList';
import {GameStatus} from '~/shared/mapper/exercise';

export function useFetchRejectJudge(exerciseId: number) {
  const queryClient = useQueryClient();
  const {resetStore} = useSpecifyTeamStore();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteRejectJudge,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, exerciseId]});
      resetStore();
      Alert.alert('심판 내보내기', '현재 게임에서 심판을 내보냈습니다.', [{text: '확인'}]);
    },
    onError: error => {
      resetStore();
      if (error.response && error.response.data.payload) {
        Alert.alert('오류 발생', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('오류 발생', '현재 게임에서 심판을 내보냈습니다.', [{text: '확인'}]);
      }
    },
  });

  function rejectJudge(gameId: number, gameStatus: keyof GameStatus) {
    if (gameStatus === 3) {
      Alert.alert('심판 내보내기', '심판을 내보내시겠습니까?', [
        {text: '취소', style: 'cancel'},
        {text: '나가기', style: 'destructive', onPress: () => mutate(gameId)},
      ]);
    } else {
      Alert.alert('게임 심판 내보내기', '심판이 지정되지 않았습니다.', [{text: '확인'}]);
    }
  }

  return {isPending, rejectJudge};
}

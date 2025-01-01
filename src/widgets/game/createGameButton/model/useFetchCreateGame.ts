import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getGameListQueryKey} from '~/features/game/fetchGameList';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {fetchPostGame, ReqPostGame} from '../api/fetchPostGame.ts';

export function useFetchCreateGame(exerciseId: number) {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {getReqPlayerList, resetStore} = useSpecifyTeamStore();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostGame,
    onSuccess: () => {
      // 1. 팀과 관련된 전역변수 초기화
      resetStore();
      navigateBack();

      // 2. 게임 리스트 업데이트
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, exerciseId]});

      // 3. Alert 창 띄우기
      Alert.alert('게임 생성', '게임을 생성했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게임 생성 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('게임 생성 실패', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function createGame() {
    const request: ReqPostGame = {
      exerciseId: exerciseId,
      matchUsers: getReqPlayerList(),
    };
    mutate(request);
  }

  return {isPending, createGame};
}

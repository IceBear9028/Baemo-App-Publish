import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutGame, ReqPutGame} from '../api/fetchPutGame.ts';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {getGameListQueryKey} from 'widgets/game/detailGameList';

export function useFetchEditGame() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {meta, resetStatus} = useTeamMetaStore();
  const {getReqPlayerList, resetStore} = useSpecifyTeamStore();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutGame,
    onSuccess: (_, input) => {
      // 1, 쿼리 값 리셋
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, input.exerciseId]});

      // 2. 팀과 관련된 전역변수 초기화
      resetStore();
      resetStatus();

      // 3. 페이지 뒤로 이동
      navigateBack();

      // 4. Alert 창 띄우기
      Alert.alert('게임 생성', '게임을 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게임 변경 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('게임 변경 실패', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function editGame(exerciseId: number, gameId: number) {
    const request: ReqPutGame = {
      exerciseId: exerciseId,
      courtNumber: Number(meta.courtNumber),
      matchUsers: getReqPlayerList(),
      matchId: gameId,
    };
    mutate(request);
  }

  return {isPending, editGame};
}

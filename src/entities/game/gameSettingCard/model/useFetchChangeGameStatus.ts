import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutChangeGameStatus, PutChangeGameStatus} from '~/entities/game/gameSettingCard/api/fetchPutChangeGameStatus.ts';
import {getGameListQueryKey} from '~/features/game/fetchGameList';
import {GameStatus} from '~/shared/mapper/exercise';

const gameStatus = new GameStatus();

export function useFetchChangeGameStatus() {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutChangeGameStatus,
    onSuccess: (_, param) => {
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, param.exerciseId]});
      Alert.alert('상태 변경', '게임 상태를 변경했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('상태 변경', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('상태 변경', '서버에 에러가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function nextStatusGame(exerciseId: number, gameId: number, status: keyof GameStatus, courtNumber?: number) {
    const nextStatus = Number(status) + 1 === 3 ? 4 : ((Number(status) + 1) as any);
    const isProgressGame = status === 2 || status === 3;
    const request: PutChangeGameStatus = {
      exerciseId,
      gameId,
      courtNumber: courtNumber ? courtNumber : null,
      matchStatus: GameStatus.convertResponse(Number(nextStatus) as keyof GameStatus),
    };
    console.log('>>>>>>>>>', request, nextStatus, typeof nextStatus);
    const message = isProgressGame ? '게임을 완료할까요?' : `현재 게임을 ${gameStatus[nextStatus as keyof GameStatus]} 으로 변경할까요?`;
    Alert.alert('상태 변경', message, [{text: '취소'}, {text: '확인', onPress: () => mutate(request)}]);
  }

  function prevStatusGame(exerciseId: number, gameId: number, status: keyof GameStatus, courtNumber?: number) {
    if (status === 0) {
      Alert.alert('상태 변경', '대기 중인 게임은 완료로 변경할 수 없습니다.', [{text: '확인'}]);
      return;
    }
    const prevStatus = Number(status) - 1 === 3 ? 2 : ((Number(status) - 1) as any);
    const request: PutChangeGameStatus = {
      exerciseId,
      gameId,
      courtNumber: courtNumber ? courtNumber : null,
      matchStatus: GameStatus.convertResponse(Number(prevStatus) as keyof GameStatus),
    };
    const message = `현재 게임을 ${gameStatus[prevStatus as keyof GameStatus]} 으로 변경할까요?`;
    Alert.alert('상태 변경', message, [{text: '취소'}, {text: '확인', onPress: () => mutate(request)}]);
  }

  return {isPendingStatus: isPending, nextStatusGame, prevStatusGame};
}
``;

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDeleteGame} from '../api/fetchDeleteGame.ts';
import {Alert} from 'react-native';
import {getGameListQueryKey} from '~/widgets/game/detailGameList';

export function useFetchDeleteGame(exerciseId: number) {
  const queryClient = useQueryClient();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteGame,
    onSuccess: () => {
      // 1. 쿼리 리셋
      queryClient.invalidateQueries({queryKey: [...getGameListQueryKey, exerciseId]});

      // 2. 알림 표시
      Alert.alert('게임 삭제', '게임을 삭제했습니다.', [{text: '확인'}]);
    },
    onError: () => {},
  });

  function deleteGame(gameId: number) {
    Alert.alert('게임 삭제', '게임을 정말로 삭제할까요? ', [
      {text: '취소', style: 'cancel'},
      {text: '삭제', style: 'destructive', onPress: () => mutate(gameId)},
    ]);
  }

  return {
    isPending,
    deleteGame,
  };
}

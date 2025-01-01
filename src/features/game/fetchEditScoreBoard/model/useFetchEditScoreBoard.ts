import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutScoreAction} from '../api/fetchPutScoreAction.ts';
import {fetchGetDetailGameQueryKey} from '~/features/game/fetchDetailGame';
import {fetchGetDetailGameQueryKeyTemp} from '~/pages/game/matchGamePage/model/useFetchGetDetailGameTemp.ts';

export function useFetchEditScoreBoard() {
  const queryClient = useQueryClient();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPutScoreAction,
    onSuccess: (_, param) => {
      console.log('param', param);
      queryClient.invalidateQueries({queryKey: [...fetchGetDetailGameQueryKeyTemp, param.gameId]});
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('문제발생', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('문제발생', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function actionTeamA(gameId: number) {
    console.log('gameId', gameId);
    mutate({gameId, action: 'SCORE_TEAM_A'});
  }

  function actionTeamB(gameId: number) {
    mutate({gameId, action: 'SCORE_TEAM_B'});
  }

  function revertTeamScore(gameId: number) {
    mutate({gameId, action: 'REVERT_SCORE'});
  }

  return {
    isPendingTeamA: isPending,
    actionTeamA,
    actionTeamB,
    revertTeamScore,
  };
}

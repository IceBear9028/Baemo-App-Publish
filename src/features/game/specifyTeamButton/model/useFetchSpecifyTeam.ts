import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPutSpecifyTeam} from '../api/fetchPutSpecifyTeam.ts';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {fetchGetDetailGameQueryKeyTemp} from '~/pages/game/matchGamePage';

export function useFetchSpecifyTeam() {
  const queryClient = useQueryClient();
  const {getReqSpecifyTeam} = useSpecifyTeamStore();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPutSpecifyTeam,
    onSuccess: (_, param) => {
      console.log(param);
      queryClient.invalidateQueries({queryKey: [...fetchGetDetailGameQueryKeyTemp, param.gameId]});
      console.log('팀 지정 ==>');
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게임 팀 지정', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('게임 팀 지정', '서버에 문제가 발생했습니다. 다시 시도해주세요.', [{text: '확인'}]);
      }
    },
  });

  function specifyTeam(gameId: number) {
    const playerList = getReqSpecifyTeam();
    mutate({gameId, players: playerList});
  }

  return {specifyTeam, isPendingSpecify: isPending};
}

import {useQuery} from '@tanstack/react-query';
import {GameStatus} from '~/shared/mapper/exercise';
import {fetchGetAllPlayers} from '../api/fetchGetAllPlayers.ts';

export function useFetchGetAllPlayers(exerciseId: number, status: 'all' | keyof GameStatus) {
  const {isFetching, isError, data, refetch} = useQuery({
    queryKey: ['fetchGetAllPlayers', exerciseId],
    queryFn: () => fetchGetAllPlayers(exerciseId),
    select: players => {
      if (status === 'all') {
        return players;
      } else {
        return players.filter(player => player.memberStatus === status);
      }
    },
  });
  return {
    isFetching,
    isError,
    data,
    refreshPlayer: refetch,
  };
}

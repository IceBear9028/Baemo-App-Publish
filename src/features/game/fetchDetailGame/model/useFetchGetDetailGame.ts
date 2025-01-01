import {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchGetDetailGame} from '../api/fetchGetDetailGame.ts';
import {useTeamMetaStore} from '~/features/game/teamMetaStore';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export const fetchGetDetailGameQueryKey = ['fetchGetDetailGame'];

export function useFetchGetDetailGame(gameId: number) {
  const {loadTeamInfoStore} = useTeamMetaStore();
  const {loadPlayerStore} = useSpecifyTeamStore();
  const {isFetching, data, refetch} = useQuery({
    queryKey: [...fetchGetDetailGameQueryKey, gameId],
    queryFn: () => fetchGetDetailGame(gameId),
    throwOnError: true,
  });

  // SSE 연결
  // Detail Game 정보 받으면 store 에 업데이트
  useEffect(() => {
    if (data) {
      loadPlayerStore(data);
      loadTeamInfoStore(data);
    }
  }, [data]);

  return {isFetching, detailGame: data, refetch};
}

import {useQuery} from '@tanstack/react-query';
import {fetchGetGameList} from '~/features/game/fetchGameList/api/fetchGetGameList.ts';
import {FilterGameStatus, Game, GameStatus} from '~/shared/mapper/exercise';
import {useMyProfileStore} from '~/shared/authentication';

export const getGameListQueryKey = ['fetchGetGameList'];

export function useFetchGetGameList(exerciseId: number, isMyGame?: boolean, status?: keyof FilterGameStatus) {
  const myUserId = useMyProfileStore(store => store.userId);

  // Helper 함수: 게임 상태 필터
  function filterGamesByStatus(games: Game[], status?: keyof FilterGameStatus) {
    if (status === 'inProgress') {
      return games.filter(game => GameStatus.inProgressStatus.includes(game.gameStatus));
    }
    if (status === 'completed') {
      return games.filter(game => GameStatus.completedStatus.includes(game.gameStatus));
    }
    return games;
  }

  // Helper 함수: 사용자 게임 필터
  function filterMyGames(games: Game[], userId: number) {
    return games.filter(game => {
      const allGameMembers = [...game.teamA.player, ...game.teamB.player];
      const memberIdList = allGameMembers.map(member => member.userId);
      return memberIdList.includes(userId);
    });
  }

  const {isError, isFetching, data, refetch} = useQuery({
    queryKey: [...getGameListQueryKey, exerciseId, isMyGame],
    queryFn: () => fetchGetGameList(exerciseId),
    select: gameList => {
      const filteredMyGames = isMyGame ? filterMyGames(gameList, myUserId) : gameList;

      // 필터상태가 없으면 게임리스트 전체를 반환
      if (!status) {
        return filteredMyGames;
      }
      return filterGamesByStatus(filteredMyGames, status);
    },
  });

  return {
    isError,
    isFetching,
    data,
    refetch,
  };
}

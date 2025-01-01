import {apiRequest} from '~/shared/fetch';
import {Game, GameResponse, GameStatusResponse} from '~/shared/mapper/exercise';

const statusOrder: GameStatusResponse[] = ['PROGRESS_SCORING', 'PROGRESS', 'NEXT', 'WAITING', 'COMPLETE', 'HISTORY'];

export async function fetchGetGameList(exerciseId: number) {
  const {data} = await apiRequest<GameResponse[]>(`api/match/exercise/${exerciseId}/all`, 'get');
  return data.payload
    .sort((a, b) => {
      // 1차 소팅: matchStatus 기준으로 정렬
      const statusComparison = statusOrder.indexOf(a.matchStatus) - statusOrder.indexOf(b.matchStatus);

      if (statusComparison !== 0) {
        return statusComparison; // matchStatus가 다르면 그 기준으로 정렬
      }

      // 2차 소팅: matchOrder 기준으로 정렬
      return a.matchOrder - b.matchOrder;
    })
    .map(gameRes => new Game(gameRes));
}

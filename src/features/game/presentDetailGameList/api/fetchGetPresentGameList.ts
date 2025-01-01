import {apiRequest} from '~/shared/fetch';
import {Game, GameResponse} from '~/shared/mapper/exercise';

export async function fetchGetPresentGameList(exerciseId: number) {
  const {data} = await apiRequest<GameResponse[]>(`api/match/exercise/${exerciseId}/progress`, 'get');
  return data.payload.map(gameRes => new Game(gameRes));
}

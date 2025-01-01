import {apiRequest} from '~/shared/fetch';
import {Game} from '~/shared/mapper/exercise';

export async function fetchPostStartGame(game: Game) {
  const {gameId} = game;
  const {data} = await apiRequest(`api/match/${gameId}/scoreboard`, 'post');
  return data;
}

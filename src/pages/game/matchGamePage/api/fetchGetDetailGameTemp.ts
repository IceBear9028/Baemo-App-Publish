import {apiRequest} from '~/shared/fetch';
import {DetailGame, DetailGameResponse} from '~/shared/mapper/exercise';

export async function fetchGetDetailGameTemp(gameId: number) {
  const {data} = await apiRequest<DetailGameResponse>(`api/match/temp/${gameId}/scoreboard`, 'get');
  return new DetailGame(data.payload);
}

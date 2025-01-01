import {apiRequest} from '~/shared/fetch';
import {DetailGame, DetailGameResponse} from '~/shared/mapper/exercise';

export async function fetchGetDetailGame(gameId: number) {
  const {data} = await apiRequest<DetailGameResponse>(`api/match/${gameId}`, 'get');
  return new DetailGame(data.payload);
}

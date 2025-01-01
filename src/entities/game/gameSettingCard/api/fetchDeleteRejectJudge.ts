import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteRejectJudge(gameId: number) {
  const {data} = await apiRequest(`api/match/${gameId}/scoreboard`, 'delete');
  return data;
}

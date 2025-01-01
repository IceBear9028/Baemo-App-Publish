import {apiRequest} from '~/shared/fetch';

export async function fetchDeleteGame(gameId: number) {
  const {data} = await apiRequest(`api/match/${gameId}`, 'delete');
  return data;
}

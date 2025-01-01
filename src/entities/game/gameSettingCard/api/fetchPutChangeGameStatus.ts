import {apiRequest} from '~/shared/fetch';
import {GameStatusResponse} from '~/shared/mapper/exercise';

export interface PutChangeGameStatus {
  gameId: number;
  exerciseId: number;
  courtNumber: null | number;
  matchStatus: GameStatusResponse;
}

export async function fetchPutChangeGameStatus(req: PutChangeGameStatus) {
  const {gameId, courtNumber, matchStatus} = req;
  const {data} = await apiRequest(`api/match/${gameId}`, 'patch', {matchStatus, courtNumber});
  return data;
}

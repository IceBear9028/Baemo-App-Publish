import {apiRequest} from '~/shared/fetch';
import {GameTeamUserRequest} from '~/shared/mapper/exercise';

export interface ReqPutGame {
  matchId: number;
  exerciseId: number;
  courtNumber: number;
  matchUsers: GameTeamUserRequest[];
}

export async function fetchPutGame(req: ReqPutGame) {
  const {matchId, ...request} = req;
  const {data} = await apiRequest(`api/match/${matchId}`, 'put', request);
  return data;
}

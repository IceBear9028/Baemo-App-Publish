import {apiRequest} from '~/shared/fetch';
import {GameTeamUserRequest} from '~/shared/mapper/exercise';

export interface ReqPostGame {
  exerciseId: number;
  matchUsers: GameTeamUserRequest[];
}

export async function fetchPostGame(req: ReqPostGame) {
  const {data} = await apiRequest('api/match', 'post', req);
  return data;
}

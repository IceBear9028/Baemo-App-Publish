import {apiRequest} from '~/shared/fetch';
import {Game} from '~/shared/mapper/exercise';
import {GameTeamUserRequest} from '~/shared/mapper/exercise';

interface PutSpecifyTeam extends Pick<Game, 'gameId'> {
  players: GameTeamUserRequest[];
}

export async function fetchPutSpecifyTeam({players, gameId}: PutSpecifyTeam) {
  const {data} = await apiRequest(`api/match/${gameId}/scoreboard/member`, 'put', {matchUsers: players});
  return data;
}

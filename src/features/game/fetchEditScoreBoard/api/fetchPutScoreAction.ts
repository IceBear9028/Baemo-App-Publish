import {apiRequest} from '~/shared/fetch';

export type ScoreActionType = 'SCORE_TEAM_A' | 'SCORE_TEAM_B' | 'REVERT_SCORE';

interface PutActionScore {
  gameId: number;
  action: ScoreActionType;
}

export async function fetchPutScoreAction({gameId, action}: PutActionScore) {
  const {data} = await apiRequest(`api/match/${gameId}/scoreboard`, 'put', {action});
  return data;
}

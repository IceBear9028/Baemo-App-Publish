import {apiRequest} from '~/shared/fetch';
import {GameCourt, GameCourtResponse} from '~/shared/mapper/exercise/lib/gameCourt.ts';

export async function fetchGetCourtList(exerciseId: number) {
  const {data} = await apiRequest<GameCourtResponse[]>(`api/exercises/${exerciseId}/court`, 'get');
  return data.payload.map(courtRes => new GameCourt(courtRes)).sort((a, b) => a.courtNumber - b.courtNumber);
}

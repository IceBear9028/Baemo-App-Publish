import {apiRequest} from '~/shared/fetch';
import {ExerciseGameMember, ExerciseGameMemberResponse, GameStatusResponse} from '~/shared/mapper/exercise';

const statusOrder: GameStatusResponse[] = ['COMPLETE', 'WAITING', 'NEXT', 'PROGRESS', 'PROGRESS_SCORING', 'HISTORY'];

export async function fetchGetAllPlayers(exerciseId: number) {
  const {data} = await apiRequest<ExerciseGameMemberResponse[]>(`api/exercises/${exerciseId}/member/match`, 'get');
  return data.payload
    .sort((a, b) => {
      // 1차 소팅: matchStatus 기준으로 정렬
      const statusComparison = statusOrder.indexOf(a.userStatus) - statusOrder.indexOf(b.userStatus);

      if (statusComparison !== 0) {
        return statusComparison; // matchStatus가 다르면 그 기준으로 정렬
      }

      // 2차 소팅: matchOrder 기준으로 정렬
      return a.matchCount - b.matchCount;
    })
    .map(member => new ExerciseGameMember(member));
}

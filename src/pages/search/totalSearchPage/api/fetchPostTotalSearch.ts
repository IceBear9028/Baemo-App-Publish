import {apiRequest} from '~/shared/fetch';
import {Groups, GroupsItemResponse} from '~/shared/mapper/groups';
import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

interface TotalSearchReq {
  query: string;
}

interface SearchResultResponse {
  clubs: GroupsItemResponse[];
  exercises: ExerciseItemResponse[];
}

export async function fetchPostTotalSearch(req: TotalSearchReq) {
  const {data} = await apiRequest<SearchResultResponse, TotalSearchReq>('api/search/total', 'post', req);
  return {
    groups: data.payload.clubs.map(group => new Groups(group)),
    exercises: data.payload.exercises.map(exercise => new Exercise(exercise)),
  };
}

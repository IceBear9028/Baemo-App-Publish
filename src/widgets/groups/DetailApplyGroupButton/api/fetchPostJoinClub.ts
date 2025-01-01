import {apiRequest} from '~/shared/fetch';

export async function fetchPostJoinClub(clubsId: number) {
  const {data} = await apiRequest(`api/clubs/join/${clubsId}`, 'post');
  return {...data};
}

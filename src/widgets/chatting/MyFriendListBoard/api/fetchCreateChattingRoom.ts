import {apiRequest} from '~/shared/fetch';

export async function fetchCreateChattingRoom(targetId: number) {
  const {data} = await apiRequest(`api/chat/${targetId}`, 'post');
  return {...data};
}

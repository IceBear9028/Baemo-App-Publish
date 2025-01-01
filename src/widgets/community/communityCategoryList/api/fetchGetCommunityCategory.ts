import {CommunityCategory, CommunityCategoryResponse} from '~/shared/mapper/community';
import {apiRequest} from '~/shared/fetch';

export async function fetchGetCommunityCategory() {
  const {data} = await apiRequest<{list: CommunityCategoryResponse[]}>('api/communities/category', 'get');
  return {...data, payload: data.payload.list.map(category => new CommunityCategory(category))};
}

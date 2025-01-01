import {GroupArticle, GroupArticleNoticeResponse} from '~/shared/mapper/groups';
import {apiRequest} from '~/shared/fetch';
import {GroupArticleNormalResponse, GroupArticleNotice} from '~/shared/mapper/groups/lib/groupArticle.ts';

interface AllGroupArticleResponse {
  previewNoticeDTOList: GroupArticleNoticeResponse[];
  previewClubsPostDTOList: GroupArticleNormalResponse[];
}

interface ReqInfiniteParam {
  page: number;
  size: number;
}

export async function fetchGetGroupNoticeList(groupsId: number) {
  const {data} = await apiRequest<AllGroupArticleResponse>(`api/clubs/${groupsId}/post`, 'get');
  return data.payload.previewNoticeDTOList.map(postRes => new GroupArticleNotice(postRes));
}

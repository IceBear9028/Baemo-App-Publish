import {ArticleGroupCategoryId} from '~/widgets/groups/groupArticleList';
import {GroupArticle, GroupArticleNoticeResponse} from '~/shared/mapper/groups';
import {apiRequest} from '~/shared/fetch';
import {GroupArticleNormalResponse} from '~/shared/mapper/groups/lib/groupArticle.ts';

interface AllGroupArticleResponse {
  previewNoticeDTOList: GroupArticleNoticeResponse[];
  previewClubsPostDTOList: GroupArticleNormalResponse[];
}

interface ReqInfiniteParam {
  page: number;
  size: number;
}

export async function fetchGetGroupArticle(groupsId: number, categoryId: ArticleGroupCategoryId, param: ReqInfiniteParam) {
  if (categoryId === 'all') {
    const {data} = await apiRequest<AllGroupArticleResponse, undefined, ReqInfiniteParam>(
      `api/clubs/${groupsId}/post`,
      'get',
      undefined,
      param,
    );
    return data.payload.previewClubsPostDTOList.map(postRes => new GroupArticle(postRes));
  } else {
    const postType = GroupArticle.convertType(categoryId);
    const {data} = await apiRequest<Pick<AllGroupArticleResponse, 'previewClubsPostDTOList'>, undefined, ReqInfiniteParam>(
      `api/clubs/${groupsId}/post/type/${postType}`,
      'get',
      undefined,
      param,
    );
    return data.payload.previewClubsPostDTOList.map(postRes => new GroupArticle(postRes));
  }
}

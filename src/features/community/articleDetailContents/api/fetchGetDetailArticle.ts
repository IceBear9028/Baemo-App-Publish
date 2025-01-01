import {CommunityDetailArticle} from '~/shared/mapper/community';

export async function fetchGetDetailArticle(articleId: number) {
  return new CommunityDetailArticle(articleId as any, true);
}

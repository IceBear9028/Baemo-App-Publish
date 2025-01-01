import {useEffect} from 'react';
import {Groups} from '~/shared/mapper/groups';
import {useQuery} from '@tanstack/react-query';
import {GroupArticle} from '~/shared/mapper/groups';
import {fetchGetDetailGroupArticle} from '../api/fetchGetDetailGroupArticle.ts';
import {useGroupArticlePermissionStore} from '../model/useGroupArticlePermissionStore.ts';

export const detailGroupArticleQueryKey = ['fetchGetDetailGroupArticle'];

export interface FetchGroupArticleProps extends Pick<GroupArticle, 'id'>, Pick<Groups, 'groupsId'> {}

export function useFetchGroupArticle(groupsId: number, articleId: number) {
  const {setPermission, resetPermission, setUserId, resetUserId} = useGroupArticlePermissionStore();
  const {isFetching, isError, data} = useQuery({
    queryKey: [...detailGroupArticleQueryKey, articleId],
    queryFn: () => fetchGetDetailGroupArticle(groupsId, articleId),
    throwOnError: true,
  });

  useEffect(() => {
    if (data) {
      setPermission(data.article.permission);
      setUserId(data.author.userId);
      return;
    }
    if (isError) {
      resetPermission();
      resetUserId();
      return;
    }
  }, [data, groupsId, articleId]);

  return {
    isFetchingArticle: isFetching,
    isErrorArticle: isError,
    data,
  };
}

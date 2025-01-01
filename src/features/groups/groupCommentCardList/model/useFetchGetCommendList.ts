import {useQuery} from '@tanstack/react-query';
import {countTotalComments} from '../lib/countTotalComment';
import {convertCommentList} from '../lib/convertCommentList';
import {fetchGetGroupCommentList} from '../api/fetchGetGroupCommentList.ts';

export const groupCommentListQueryKey = ['fetchGetGroupCommentList'];

export function useFetchGetCommendList(articleId: number) {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...groupCommentListQueryKey, articleId],
    queryFn: () => fetchGetGroupCommentList(articleId),
    select: data => convertCommentList(data),
  });
  const commentCount = data && countTotalComments(data);
  return {
    isFetching,
    isError,
    data,
    commentCount,
  };
}

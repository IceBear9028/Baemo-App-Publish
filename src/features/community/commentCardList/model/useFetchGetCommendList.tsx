import {useQuery, useQueryClient} from '@tanstack/react-query';
import {countTotalComments} from '../lib/countTotalComment';
import {convertCommentList} from '../lib/convertCommentList';
import {fetchGetCommentList} from '../api/fetchGetCommentList';

export function useFetchGetCommendList(articleId?: number) {
  const queryClient = useQueryClient();
  const {isFetching, isError, data} = useQuery({
    queryKey: ['fetchGetCommentList', articleId],
    queryFn: () => fetchGetCommentList(articleId),
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

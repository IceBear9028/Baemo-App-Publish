import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDeleteGroupComment} from '../api/fetchDeleteGroupComment.ts';
import {groupCommentListQueryKey} from '~/features/groups/groupCommentCardList';
import {Alert} from 'react-native';
import {useGroupCommentStore} from '~/features/groups/groupCommentWriteForm';

export function useFetchDeleteComment(articleId: number) {
  const queryClient = useQueryClient();
  const resetComment = useGroupCommentStore(store => store.resetContent);
  const {isPending, mutate} = useMutation({
    mutationFn: fetchDeleteGroupComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [...groupCommentListQueryKey, articleId]});
    },
    onError: () => {
      Alert.alert('삭제실패', '서버에 오류가 발생했습니다.', [{text: '확인'}]);
    },
  });

  function fetchDeleteComment(commentId: number) {
    resetComment();
    Alert.alert('댓글 삭제', '댓글을 삭제할까요?', [
      {text: '취소'},
      {text: '확인', style: 'destructive', onPress: () => mutate({postId: articleId, commentId: commentId})},
    ]);
  }

  return {
    isPendingDel: isPending,
    fetchDeleteComment,
  };
}

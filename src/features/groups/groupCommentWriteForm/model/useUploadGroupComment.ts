import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostGroupComment} from '../api/fetchPostGroupComment.ts';
import {fetchEditGroupComment} from '../api/fetchEditGroupComment.ts';
import {useGroupCommentStore} from '../model/useGroupCommentStore.ts';
import {groupCommentListQueryKey} from '~/features/groups/groupCommentCardList';

export function useUploadGroupComment(articleId: number) {
  const queryClient = useQueryClient();
  const {getRequestComment, getRequestEditComment, resetContent, editCommentId} = useGroupCommentStore();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostGroupComment,
    onSuccess: () => {
      resetContent();
      queryClient.invalidateQueries({queryKey: [...groupCommentListQueryKey, articleId]});
    },
    onError: () => {
      Alert.alert('에러 발생', '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    },
  });
  const mutateEdit = useMutation({
    mutationFn: fetchEditGroupComment,
    onSuccess: () => {
      resetContent();
      queryClient.invalidateQueries({queryKey: [...groupCommentListQueryKey, articleId]});
    },
    onError: () => {
      Alert.alert('에러 발생', '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    },
  });

  function fetchUploadComment() {
    if (editCommentId) {
      mutateEdit.mutate(getRequestEditComment(articleId));
    } else {
      mutate(getRequestComment(articleId));
    }
  }

  function postComment() {
    mutate(getRequestComment(articleId));
  }
  return {
    postComment,
    isError,
    isPending,
    fetchUploadComment,
  };
}

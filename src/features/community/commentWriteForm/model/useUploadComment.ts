import {useMutation} from '@tanstack/react-query';
import {fetchPostComment} from '~/features/community/commentWriteForm/api/fetchPostComment.ts';
import {useCommentStore} from '~/features/community/commentWriteForm/model/useCommentStore.ts';
import {Alert} from 'react-native';

export function useUploadComment() {
  const getRequestComment = useCommentStore(store => store.getRequestComment);
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostComment,
    onError: () => {
      Alert.alert('에러 발생', '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    },
  });
  function postComment() {
    mutate(getRequestComment());
  }
  return {
    postComment,
    isError,
    isPending,
  };
}

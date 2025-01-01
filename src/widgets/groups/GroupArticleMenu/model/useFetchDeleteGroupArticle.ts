import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDelGroupArticle, ReqDelGroupArticle} from '../api/fetchDelGroupArticle.ts';
import {groupArticleListQueryKey} from '~/widgets/groups/groupArticleList';
import {useMainNavigate} from '~/shared/route';

export function useFetchDeleteGroupArticle() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchDelGroupArticle,
    onSuccess: () => {
      Alert.alert('게시글 삭제', '게시글을 삭제했습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...groupArticleListQueryKey]});
            navigateBack();
          },
        },
      ]);
    },
    onError: () => {
      Alert.alert('삭제 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
    },
  });

  function deleteGroup(groupsId: number, articleId?: number) {
    if (articleId) {
      Alert.alert('게시글 삭제', '정말로 게시글을 삭제할까요?', [
        {text: '취소'},
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const req: ReqDelGroupArticle = {
              groupsId,
              articleId,
            };
            mutate(req);
          },
        },
      ]);
    } else {
      Alert.alert('게시글 삭제', '알수없는 문제가 발생했습니다.', [{text: '확인'}]);
    }
  }

  return {
    isPendingDel: isPending,
    deleteGroup,
  };
}

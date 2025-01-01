import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchDelServiceNoticeArticle} from '../api/fetchDelServiceNoticeArticle.ts';
import {getServiceNoticeListQueryKey} from '~/widgets/serviceNotice/serviceNoticeList';
import {useMainNavigate} from '~/shared/route';

export function useFetchDeleteNoticeArticle() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchDelServiceNoticeArticle,
    onSuccess: () => {
      Alert.alert('공지 삭제', '공지글을 삭제했습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...getServiceNoticeListQueryKey]});
            navigateBack();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('삭제 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('삭제 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function deleteServiceNotice(articleId?: number) {
    if (articleId) {
      Alert.alert('게시글 삭제', '정말로 게시글을 삭제할까요?', [
        {text: '취소'},
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => mutate(articleId),
        },
      ]);
    } else {
      Alert.alert('게시글 삭제', '알수없는 문제가 발생했습니다.', [{text: '확인'}]);
    }
  }

  return {
    isPendingDel: isPending,
    deleteServiceNotice,
  };
}

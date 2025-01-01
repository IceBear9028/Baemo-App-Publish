import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useArticleTextStore} from '~/pages/groups/groupArticleWritePage/model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '~/pages/groups/groupArticleWritePage/model/useArticleTitleStore.ts';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';
import {groupArticleListQueryKey} from '~/widgets/groups/groupArticleList';
import {fetchPutGroupArticle, ReqPutArticleMetaType} from '~/pages/groups/groupArticleWritePage/api/fetchPutGroupArticle.ts';
import {GroupArticle} from '~/shared/mapper/groups';
import {detailGroupArticleQueryKey} from '~/features/groups/groupArticleContents';

export function useFetchEditGroupArticle() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {text, resetText} = useArticleTextStore();
  const {title, resetTitle} = useArticleTitleStore();
  const {resetGroupImages} = useArticleImageStore();
  const groupArticleImage = useArticleImageStore(store => store.groupImages);
  const {groupArticleStatus, resetGroupArticleStatus} = useArticleStatusStore();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: fetchPutGroupArticle,
    onSuccess: (res, req) => {
      resetText();
      resetTitle();
      resetGroupImages();
      resetGroupArticleStatus();
      queryClient.invalidateQueries({queryKey: [...groupArticleListQueryKey]});
      queryClient.invalidateQueries({queryKey: [...detailGroupArticleQueryKey, req.clubsPostId]});
      Alert.alert('모임글 변경', '게시글을 변경했습니다.', [{text: '확인', onPress: () => navigateBack()}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('모임글 변경 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임글 변경 실패', '서버에 오류가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function putGroupArticle(articleId: number) {
    const postInfo: ReqPutArticleMetaType = {
      clubsPostId: articleId,
      title: title,
      content: text,
      type: GroupArticle.convertType(groupArticleStatus as any),
      uploadImage: groupArticleImage,
    };
    await mutateAsync(postInfo);
  }

  return {
    isPendingPut: isPending,
    putGroupArticle,
  };
}

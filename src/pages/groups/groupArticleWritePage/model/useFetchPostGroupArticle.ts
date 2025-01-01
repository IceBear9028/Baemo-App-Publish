import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {GroupArticle} from '~/shared/mapper/groups';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {groupArticleListQueryKey} from '~/widgets/groups/groupArticleList';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';
import {fetchPostGroupArticle, ReqMetaGroupArticleUpload} from '../api/fetchPostGroupArticle.ts';

export function useFetchPostGroupArticle(groupsId: number) {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {text, resetText} = useArticleTextStore();
  const {title, resetTitle} = useArticleTitleStore();
  const {resetGroupImages} = useArticleImageStore();
  const groupArticleImage = useArticleImageStore(store => store.groupImages);
  const {groupArticleStatus, resetGroupArticleStatus} = useArticleStatusStore();
  const {isPending, mutateAsync} = useMutation({
    mutationFn: fetchPostGroupArticle,
    onSuccess: () => {
      resetText();
      resetTitle();
      resetGroupImages();
      resetGroupArticleStatus();
      queryClient.invalidateQueries({queryKey: [...groupArticleListQueryKey, groupsId]});
      Alert.alert('모임글 작성', '게시글을 등록했습니다.', [{text: '확인', onPress: () => navigateBack()}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('모임글 등록 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임글 등록 실패', '서버에 예상치 못한 오류가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function postGroupArticle() {
    const postInfo: ReqMetaGroupArticleUpload = {
      clubsId: groupsId,
      title: title,
      content: text,
      type: GroupArticle.convertType(groupArticleStatus as any),
      uploadImage: groupArticleImage,
    };
    await mutateAsync(postInfo);
  }

  return {
    isPendingPost: isPending,
    postGroupArticle,
  };
}

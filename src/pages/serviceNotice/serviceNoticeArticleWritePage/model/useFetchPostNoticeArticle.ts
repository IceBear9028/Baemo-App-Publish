import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {fetchPostServiceNoticeArticle, ReqServiceNoticeMeta} from '../api/fetchPostServiceNoticeArticle.ts';
import {getServiceNoticeListQueryKey} from '~/widgets/serviceNotice/serviceNoticeList';

export function useFetchPostNoticeArticle() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {text, resetText} = useArticleTextStore();
  const {title, resetTitle} = useArticleTitleStore();
  const {resetNoticeImages} = useArticleImageStore();
  const uploadArticleImage = useArticleImageStore(store => store.serviceNoticeImages);
  const {isPending, mutateAsync} = useMutation({
    mutationFn: fetchPostServiceNoticeArticle,
    onSuccess: () => {
      resetText();
      resetTitle();
      resetNoticeImages();
      queryClient.invalidateQueries({queryKey: [...getServiceNoticeListQueryKey]});
      Alert.alert('공지사항 작성', '공지사항을 등록했습니다.', [{text: '확인', onPress: () => navigateBack()}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('공지사항 등록 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('공지사항 등록 실패', '서버에 예상치 못한 오류가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function postServiceNoticeArticle() {
    const postInfo: ReqServiceNoticeMeta = {
      title: title,
      content: text,
      uploadImage: uploadArticleImage,
    };
    await mutateAsync(postInfo);
  }

  return {
    isPendingPost: isPending,
    postServiceNoticeArticle,
  };
}

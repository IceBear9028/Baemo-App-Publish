import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTextStore} from './useArtcleTextStore.ts';
import {useArticleTitleStore} from './useArticleTitleStore.ts';
import {getServiceNoticeListQueryKey} from '~/widgets/serviceNotice/serviceNoticeList';
import {fetchPutServiceArticle, ReqServiceNoticeMeta} from '../api/fetchPutServiceArticle.ts';

export function useFetchEditNoticeArticle() {
  const queryClient = useQueryClient();
  const {navigateBack} = useMainNavigate();
  const {text, resetText} = useArticleTextStore();
  const {title, resetTitle} = useArticleTitleStore();
  const {resetGroupImages} = useArticleImageStore();
  const uploadArticleImage = useArticleImageStore(store => store.serviceNoticeImages);

  const {isPending, mutateAsync} = useMutation({
    mutationFn: fetchPutServiceArticle,
    onSuccess: (res, req) => {
      resetText();
      resetTitle();
      resetGroupImages();
      queryClient.invalidateQueries({queryKey: [...getServiceNoticeListQueryKey]});
      Alert.alert('공지사항 작성', '공지사항을 등록했습니다.', [{text: '확인', onPress: () => navigateBack()}]);
    },
    onError: error => {
      if (error.response?.data) {
        Alert.alert('공지사항 등록 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('공지사항 등록 실패', '서버에 오류가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function putServiceNoticeArticle(articleId: number) {
    const postInfo: ReqServiceNoticeMeta = {
      title: title,
      content: text,
      uploadImage: uploadArticleImage,
      articleId: articleId,
    };
    await mutateAsync(postInfo);
  }

  return {
    isPendingPut: isPending,
    putServiceNoticeArticle,
  };
}

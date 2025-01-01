import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {useMutation} from '@tanstack/react-query';
import {fetchPostReportArticle, ReqReportByArticle} from '~/pages/report/reportArticlePage/api/fetchPostReportArticle.ts';

export interface reportArticleCreateDto {
  postId: number;
  reasons: string[];
  description: string;
}

export function useFetchPostReportArticle() {
  const {navigateBack} = useMainNavigate();
  const {isPending, mutate} = useMutation({
    mutationFn: fetchPostReportArticle,
    onSuccess: () => {
      Alert.alert('게시글 신고', '게시글의 신고가 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigateBack();
          },
        },
      ]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('게시글 신고 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('게시글 신고 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });
  function postReportArticle({postId, reasons, description}: ReqReportByArticle) {
    const createDto: ReqReportByArticle = {
      postId,
      reasons,
      description,
    };
    mutate(createDto);
  }

  return {
    isPendingReportArticle: isPending,
    postReportArticle,
  };
}

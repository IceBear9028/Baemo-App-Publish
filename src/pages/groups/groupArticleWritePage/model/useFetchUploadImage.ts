import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {fetchUploadImage} from '../api/fetchUploadImage.ts';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {Response} from '@bam.tech/react-native-image-resizer';

export function useFetchUploadImage() {
  const uploadArticleImage = useArticleImageStore(store => store.groupImages);
  const {mutateAsync} = useMutation({
    mutationFn: fetchUploadImage,
    onError: error => {
      console.error(error);
      if (error.response?.data) {
        Alert.alert('모임글 등록 실패', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('모임글 등록 실패', `${error}`, [{text: '확인'}]);
      }
    },
  });

  async function uploadImage() {
    const imageCount = uploadArticleImage.length;
    if (imageCount > 10) {
      Alert.alert('이미지는 최대 10장까지 첨부 가능합니다.');
      return;
    }
    return await mutateAsync({images: uploadArticleImage as Response[]});
  }

  return {uploadImage};
}

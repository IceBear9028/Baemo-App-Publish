import {launchImageLibrary} from 'react-native-image-picker';
import {ImageStatusType, PickerImageInfo, useArticleImageStore} from './useArticleImageStore.ts';
import {Alert} from 'react-native';

const validTypeList = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

export const MAX_IMAGE_COUNT = 5;

export function useSelectImages(articleStatus: ImageStatusType) {
  const {communityImages, groupImages, serviceNoticeImages, setCommunityImages, setGroupImages, setNoticeImages} = useArticleImageStore();
  const prevImageCount = () => {
    switch (articleStatus) {
      case 'group':
        return groupImages.length;
      case 'community':
        return communityImages.length;
      case 'notice':
        return serviceNoticeImages.length;
    }
  };

  const onSelectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // 0 means no limit on selection
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ArticleImagePicker Error: ', response.errorMessage);
        } else {
          // imageType 이 jpeg,png 만 가능한 경우
          const hasValidType = () => {
            if (response.assets) {
              if (response.assets.length + prevImageCount() > MAX_IMAGE_COUNT) {
                Alert.alert(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부 가능합니다.`);
                return;
              }
              for (let asset of response.assets) {
                if (asset.type && validTypeList.includes(asset.type)) {
                  return true;
                } else {
                  Alert.alert('선택한 이미지는 유효하지 않은 이미지입니다.');
                  break;
                }
              }
            }
          };

          const selectedImages: PickerImageInfo[] =
            response.assets && hasValidType()
              ? response.assets.map(asset => {
                  return {
                    uri: asset.uri,
                    width: asset.width,
                    height: asset.height,
                    fileName: asset.fileName,
                    type: asset.type,
                  };
                })
              : [];
          switch (articleStatus) {
            case 'group':
              setGroupImages(selectedImages);
              break;
            case 'community':
              setCommunityImages(selectedImages);
              break;
            case 'notice':
              setNoticeImages(selectedImages);
              break;
          }
        }
      },
    );
  };

  return {onSelectImages};
}

import {launchImageLibrary} from 'react-native-image-picker';
import {UpdateBackgroundStore} from '../model/useBackgroundImageStore.ts';

export function selectBackgroundPicker(setSelectImage: UpdateBackgroundStore) {
  launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 1, // 0 means no limit on selection
      includeBase64: true,
    },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ArticleImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets
          ? response.assets.map(asset => ({
              uri: asset.uri,
              width: asset.width,
              height: asset.height,
              fileName: asset.fileName,
              type: asset.type,
              base64: asset.base64,
            }))
          : [];
        setSelectImage(selectedImages[0]);
      }
    },
  );
}

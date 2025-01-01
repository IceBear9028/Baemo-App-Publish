import {launchImageLibrary} from 'react-native-image-picker';
import {UpdateProfileStore} from '../model/useProfileImageStore.ts';

export function selectProfileImagePicker(setSelectImage: UpdateProfileStore) {
  launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 1, // 0 means no limit on selection
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
            }))
          : [];
        setSelectImage(selectedImages[0]);
      }
    },
  );
}

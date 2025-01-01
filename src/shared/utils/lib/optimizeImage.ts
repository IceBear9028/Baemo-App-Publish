import ImageResizer from '@bam.tech/react-native-image-resizer';
import Rnfs from 'react-native-fs';

export interface CommonImageInfo {
  uri?: string;
  width?: number;
  height?: number;
  fileName?: string;
  type?: string;
  base64?: string;
}

export async function optimizeProfileImage(imageInfo: CommonImageInfo) {
  const {fileName, uri} = imageInfo;
  if (uri && fileName) {
    return await ImageResizer.createResizedImage(
      uri, // path
      300, // width
      300, // height
      'JPEG', // format
      100, // quality
      undefined, // rotation
      null,
      undefined, // keepMeta,
      undefined, // options => object
    );
  }
}

export async function optimizeFullSizeImage(imageInfo: CommonImageInfo) {
  if (imageInfo.uri && imageInfo.width && imageInfo.height) {
    const ratio = 0.7;
    const convertImageWidth = Math.round(imageInfo.width * ratio);
    const convertImageHeight = Math.round(imageInfo.height * ratio);
    return await ImageResizer.createResizedImage(
      imageInfo.uri, // path
      convertImageWidth, // width
      convertImageHeight, // height
      'JPEG', // format
      100, // quality
      undefined, // rotation
      null,
      undefined, // keepMeta,
      undefined, // options => object
    );
  }
}

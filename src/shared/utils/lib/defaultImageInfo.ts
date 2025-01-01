import {Image} from 'react-native';
const localImage = require('~/shared/images/image/defaultImage.jpg');

/** ### defaultImageInfo()
 * #### 사용용도
 * - 프로젝트 내의 로컬 이미지에서 uri, type, name 을 추출
 */
export function defaultImageInfo() {
  const imageSource = Image.resolveAssetSource(localImage);
  const uri = imageSource.uri;
  const name = uri.split('/').pop()?.split('?')[0] as string; // 파일 이름 추출
  const extension = name.split('.').pop(); // 파일 확장자 추출
  const type = extension ? `image/${extension}` : 'application/octet-stream'; // 이미지 MIME 타입
  return {uri, name, type};
}

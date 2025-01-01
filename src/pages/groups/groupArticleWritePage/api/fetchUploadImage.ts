import {apiRequest} from '~/shared/fetch';
import {PickerImageInfo} from 'features/community/articleImagePicker';
import {optimizeFullSizeImage} from '~/shared/utils';

export interface ReqImageList {
  path: string;
  order: number;
  isThumbnail: boolean;
}

interface UploadImagesReq {
  images: PickerImageInfo[];
}

interface ReqImageUrls {
  preSignedUrl: string;
  savedUrl: string;
}

export async function fetchUploadImage({images}: UploadImagesReq): Promise<ReqImageList[] | undefined> {
  try {
    // 1. 서버에 전달할 이미지 정보 Array 값 초기화
    let reqImageList: ReqImageList[] = [];

    // 2. 스토리지 서버에 업로드 할 이미지 개수 확인
    const uploadImageCount = images.filter(item => item.fileName).length;

    // 3. 스토리지 서버에 업로드 할 이미지 URL 호출
    let preSignedUrlList: string[] = [];
    let savedUrlList: string[] = [];
    if (uploadImageCount) {
      const {data} = await apiRequest<{urls: ReqImageUrls[]}, {count: number}>('api/clubs/post/images/path', 'post', {
        count: uploadImageCount,
      });
      preSignedUrlList = data.payload.urls.map(item => item.preSignedUrl);
      savedUrlList = data.payload.urls.map(item => item.savedUrl);
    }

    // 4. 이미지 서버에 업로드
    for (let i = 0; i < images.length; i++) {
      const imageItem = images[i];

      // 4-1. 서버에 이미지 업로드
      if (imageItem.fileName && imageItem.uri && imageItem.width && imageItem.height) {
        // 이미지 파일 변환
        const convertImage = (await optimizeFullSizeImage(imageItem)) as any;
        const blob = await fetch(convertImage.uri).then(res => res.blob());

        // 서버에 이미지 업로드 할 url 주소 파싱
        const preSignedUrl = preSignedUrlList.shift() as string;

        // 업로드 될 이미지 주소 url 주소 파싱
        const saveUrl = savedUrlList.shift() as string;

        // Pre-signed URL로 이미지 업로드
        await fetch(preSignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg', // 업로드할 파일의 타입
          },
          body: blob, // Blob 데이터
        })
          .then(() => {
            console.log('Image successfully uploaded to S3!');
            reqImageList.push({path: saveUrl, isThumbnail: i === 0, order: i + 1});
          })
          .catch(error => {
            console.error('Error uploading image: ', error);
          });
      } else {
        // 기존 서버에 저장된 이미지 url 파싱
        const savedUrl = images[i].uri as string;

        // 서버에 전달할 이미지 정보 Array 에 전달
        reqImageList.push({path: savedUrl, isThumbnail: i === 0, order: i + 1});
      }
    }

    // 5. 스토리지 서버에 이미지 업로드 성공 시, 백엔드 서버에 전달할 이미지 전달
    return reqImageList;
  } catch (error) {
    console.error('fetchUploadNoticeImage error!', error);
    return;
  }
}

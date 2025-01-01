import {apiRequest} from '~/shared/fetch';
import {fetchUploadNoticeImage, ReqImageList} from './fetchUploadNoticeImage.ts';
import {PickerImageInfo} from '~/features/community/articleImagePicker';

export interface ReqServiceNoticeMeta {
  title: string;
  content: string;
  uploadImage: PickerImageInfo[];
}

export interface ReqServiceNoticeArticleUpload {
  title: string;
  content: string;
  images: ReqImageList[];
}

export async function fetchPostServiceNoticeArticle(input: ReqServiceNoticeMeta) {
  const {uploadImage, ...req} = input;
  const imageUrlList = await fetchUploadNoticeImage({images: uploadImage});
  if (imageUrlList) {
    const request = {...req, images: imageUrlList};
    const {data} = await apiRequest<null, ReqServiceNoticeArticleUpload>('api/notice', 'post', request);
    return data;
  }
}

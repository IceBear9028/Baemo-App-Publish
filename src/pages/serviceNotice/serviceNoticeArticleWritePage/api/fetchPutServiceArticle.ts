import {apiRequest} from '~/shared/fetch';
import {fetchUploadNoticeImage} from '../api/fetchUploadNoticeImage.ts';
import {PickerImageInfo} from '~/features/community/articleImagePicker';
import {ReqImageList} from '~/pages/groups/groupArticleWritePage/api/fetchUploadImage.ts';

export interface ReqServiceNoticeMeta {
  title: string;
  content: string;
  articleId: number;
  uploadImage: PickerImageInfo[];
}

interface ReqServiceNoticeArticleUpload {
  title: string;
  content: string;
  images: ReqImageList[];
  articleId: number;
}

export async function fetchPutServiceArticle(input: ReqServiceNoticeMeta) {
  const {uploadImage, ...req} = input;
  const imageUrlList = await fetchUploadNoticeImage({images: uploadImage});
  if (imageUrlList) {
    const request: ReqServiceNoticeArticleUpload = {...req, images: imageUrlList};
    const {data} = await apiRequest<null, ReqServiceNoticeArticleUpload>(`api/notice/${request.articleId}`, 'put', request);
    return data;
  }
}

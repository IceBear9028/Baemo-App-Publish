import {apiRequest} from '~/shared/fetch';
import {fetchUploadImage, ReqImageList} from '../api/fetchUploadImage.ts';
import {GroupArticleResponseType} from '~/shared/mapper/groups';
import {PickerImageInfo} from 'features/community/articleImagePicker';

export interface ReqMetaGroupArticleUpload {
  clubsId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  uploadImage: PickerImageInfo[];
}

interface ReqGroupArticleUpload {
  clubsId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  imageDTOList: {
    list: ReqImageList[];
  };
}

export async function fetchPostGroupArticle(input: ReqMetaGroupArticleUpload) {
  const {uploadImage, ...req} = input;
  const serverImageList = await fetchUploadImage({images: uploadImage});
  if (serverImageList) {
    const request = {...req, imageDTOList: {list: serverImageList}};
    const {data: response} = await apiRequest<null, ReqGroupArticleUpload>('api/clubs/post', 'post', request);
    return response;
  }
}

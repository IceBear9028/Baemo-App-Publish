import {apiRequest} from '~/shared/fetch';
import {GroupArticleResponseType} from '~/shared/mapper/groups';
import {PickerImageInfo} from 'features/community/articleImagePicker';
import {fetchUploadImage, ReqImageList} from '../api/fetchUploadImage.ts';

export interface ReqPutArticleMetaType {
  clubsPostId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  uploadImage: PickerImageInfo[];
}

export interface ReqPutArticleType {
  clubsPostId: number;
  title: string;
  content: string;
  type: GroupArticleResponseType;
  imageDTOList: {
    list: ReqImageList[];
  };
}

export async function fetchPutGroupArticle(input: ReqPutArticleMetaType) {
  const {uploadImage, ...req} = input;
  const serverImageList = await fetchUploadImage({images: uploadImage});
  if (serverImageList) {
    const request = {...req, imageDTOList: {list: serverImageList}};
    const {data} = await apiRequest('api/clubs/post', 'put', request);
    return data;
  }
}

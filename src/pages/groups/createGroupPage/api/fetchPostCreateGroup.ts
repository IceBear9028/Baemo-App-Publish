import {apiFormRequest} from '~/shared/fetch';

export interface CreateDTOInfo {
  clubsName: string;
  clubsSimpleDescription: string;
  clubsLocation: string;
  clubsDescription: string;
}

export interface PostCreateGroups {
  CreateDTO: CreateDTOInfo;
  clubsProfileImage: string;
  clubsBackgroundImage: string;
}

export async function fetchPostCreateGroup(req: FormData) {
  const {data} = await apiFormRequest('api/clubs', 'post', req);
  return {...data};
}

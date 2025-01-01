import {apiFormRequest} from '~/shared/fetch';

export interface UpdateDTOInfo {
  clubsId: number;
  clubsName: string;
  clubsSimpleDescription: string;
  clubsLocation: string;
  clubsDescription: string;
}

export interface PostCreateGroups {
  CreateDTO: UpdateDTOInfo;
  clubsProfileImage: string;
  clubsBackgroundImage: string;
}

export async function fetchPutUpdateGroup(req: FormData) {
  const {data} = await apiFormRequest('api/clubs', 'put', req);
  return {...data};
}

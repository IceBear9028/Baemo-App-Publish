import {apiRequest} from '~/shared/fetch';

export interface ReqReportByGroup {
  clubId: number;
  reasons: string[];
  description: string;
}

export async function fetchPostReportGroup(reqBody: ReqReportByGroup) {
  const {data} = await apiRequest('api/report/club', 'post', reqBody);
  return data;
}

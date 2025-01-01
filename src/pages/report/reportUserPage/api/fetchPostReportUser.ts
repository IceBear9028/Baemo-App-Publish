import {apiRequest} from '~/shared/fetch';

export interface ReqReportByUser {
  targetUserId: number;
  reasons: string[];
  description: string;
}

export async function fetchPostReportUser(reqBody: ReqReportByUser) {
  const {data} = await apiRequest('api/report/user', 'post', reqBody);
  return data;
}

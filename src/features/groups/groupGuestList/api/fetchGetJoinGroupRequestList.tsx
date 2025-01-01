import {apiRequest} from '~/shared/fetch';
import {GroupApplicant, GroupApplicantResponse} from '~/shared/mapper/groups';

export async function fetchGetJoinGroupRequestList(groupId: number) {
  const {data} = await apiRequest<{list: GroupApplicantResponse[]}>(`api/clubs/join/waiting/list/${groupId}`, 'get');
  return data.payload.list.map(Applicant => new GroupApplicant(Applicant));
}

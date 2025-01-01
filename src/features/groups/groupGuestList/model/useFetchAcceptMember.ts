import {Alert} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchPostAcceptMember, ReqAcceptMember} from '../api/fetchPostAcceptMember.ts';
import {applicantListQueryKey} from '~/features/groups/groupGuestList/model/useJoinGroupRequestMemberList.ts';
import {groupMemberListQueryKey} from 'widgets/groups/groupMembersList';

export function useFetchAcceptMember() {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: fetchPostAcceptMember,
    onSuccess: (res, req) => {
      queryClient.invalidateQueries({queryKey: [...applicantListQueryKey, req.clubsId]});
      queryClient.invalidateQueries({queryKey: [...groupMemberListQueryKey, req.clubsId]});
      if (req.isAccept) {
        Alert.alert('모임 신청', '모임 신청을 수락했습니다.', [{text: '확인'}]);
      } else {
        Alert.alert('모임 신청', '모임 신청을 거절했습니다.', [{text: '확인'}]);
      }
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('오류 발생', `${error.response.data.payload}`, [{text: '확인'}]);
      } else {
        Alert.alert('오류 발생', '문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  function acceptMember(groupsId: number, userId: number) {
    const req: ReqAcceptMember = {
      clubsId: groupsId,
      nonMemberId: userId,
      isAccept: true,
    };
    mutate(req);
  }

  function rejectMember(groupsId: number, userId: number) {
    const req: ReqAcceptMember = {
      clubsId: groupsId,
      nonMemberId: userId,
      isAccept: false,
    };
    mutate(req);
  }

  return {
    acceptMember,
    rejectMember,
  };
}

import {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchGetGroupIntro} from '../api/fetchGetGroupIntro';
import {useGroupDetailInfoStore, useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';

export const groupHomeInfoQueryKey = ['DetailGroupsIntroduction'];

export function useFetchGetGroupIntro(groupsId: number) {
  const {loadRole, resetRole} = useGroupRoleStore();
  const {setDescription, setBackground} = useGroupDetailInfoStore();
  const {isError, isFetching, data, error} = useQuery({
    queryKey: [...groupHomeInfoQueryKey, groupsId],
    queryFn: () => fetchGetGroupIntro(groupsId),
    throwOnError: true,
  });

  useEffect(() => {
    if (data) {
      loadRole(data.role);
      setDescription(data.introduction);
      setBackground(data.background);
      return;
    }
    if (error) {
      // 나머지 에러처리는 ApiErrorBoundary 에 위임
      resetRole();
      return;
    }
  }, [error, data, groupsId]);

  return {
    isError,
    isFetching,
    data,
  };
}

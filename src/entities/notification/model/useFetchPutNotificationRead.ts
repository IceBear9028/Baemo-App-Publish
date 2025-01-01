import {useMutation} from '@tanstack/react-query';
import {fetchPutNotificationRead} from '../api/fetchPutNotificationRead';
import {useCreateRouteParams} from '~/shared/route/model/useCreateRouteParams';

export function useFetchPutNotificationRead(domain: string, domainId: number) {
  // const {navigateDetailExercise} = useMainNavigate();
  const {navigateForDetailExerciseParams, navigateForDetailGroupsParams} = useCreateRouteParams();
  const {mutate} = useMutation({
    mutationFn: fetchPutNotificationRead,
    // 성공했을 떄 각 도메인 별 navigation 처리 필요

    onSuccess: () => {
      if (domain === 'EXERCISE') {
        console.log(domain, domainId);
        navigateForDetailExerciseParams(domainId);
      } else if (domain === 'CLUB') {
        console.log(domain, domainId);
        navigateForDetailGroupsParams(domainId);
      } else if (domain === 'NOTICE') {
        // 공지사항
      }
    },
  });

  function putNotificationRead(id: number) {
    const req = {
      notificationIds: [id],
    };
    mutate(req);
  }
  return {
    putNotificationRead,
  };
}

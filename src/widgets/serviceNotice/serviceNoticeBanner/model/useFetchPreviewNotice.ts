import {useQuery} from '@tanstack/react-query';
import {fetchGetPreviewNotice} from '~/widgets/serviceNotice/serviceNoticeBanner/api/fetchGetPreviewNotice.ts';

export const previewNoticeQueryKey = ['fetchGetPreviewNotice'];

export function useFetchPreviewNotice() {
  const {isFetching, data} = useQuery({
    queryKey: previewNoticeQueryKey,
    queryFn: () => fetchGetPreviewNotice(),
  });

  return {
    isFetching,
    data,
  };
}

import {useQuery} from '@tanstack/react-query';
import {fetchGetPreviewGroupList} from '../api/fetchGetPreviewGroupList.ts';

export const previewGroupListQueryKey = ['previewGroupListQueryKey'];

export function useFetchGetPreviewGroupList() {
  const {isError, isFetching, data} = useQuery({
    queryKey: previewGroupListQueryKey,
    queryFn: fetchGetPreviewGroupList,
  });
  return {
    isError,
    isFetching,
    data,
  };
}

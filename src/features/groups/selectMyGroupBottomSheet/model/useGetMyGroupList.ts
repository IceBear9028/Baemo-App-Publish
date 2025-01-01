import {useQuery} from '@tanstack/react-query';
import {fetchGetMyGroups} from '../api/fetchGetMyGroups';

export function useGetMyGroupList() {
  const {isError, isFetching, data} = useQuery({queryKey: ['fetchGetMyGroups'], queryFn: fetchGetMyGroups});
  return {
    isError,
    isFetching,
    data,
  };
}

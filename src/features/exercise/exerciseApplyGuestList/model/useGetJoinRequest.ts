import {useQuery} from '@tanstack/react-query';
import {fetchGetApplyGuestList} from '../api/fetchGetApplyGuestList.ts';

export const guestJoinListQueryKey = ['guestJoinListQueryKey'];

export function useGetJoinRequest(exerciseKey: number) {
  const {isError, isPending, data, refetch} = useQuery({
    queryKey: [...guestJoinListQueryKey, exerciseKey],
    queryFn: () => fetchGetApplyGuestList(exerciseKey),
    throwOnError: true,
  });
  return {
    isError,
    isPending,
    data,
    refetch,
  };
}

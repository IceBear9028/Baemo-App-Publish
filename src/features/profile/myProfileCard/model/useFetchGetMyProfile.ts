import {useQuery} from '@tanstack/react-query';
import {fetchGetMyProfile} from '../api/fetchGetMyProfile';

export const myProfileQueryKey = ['fetchGetMyProfile'];

export function useFetchGetMyProfile() {
  const {isFetching, isError, data} = useQuery({
    queryKey: [...myProfileQueryKey],
    queryFn: () => fetchGetMyProfile(),
    throwOnError: true,
  });
  console.log('프로필확인', data);
  return {
    isError,
    isFetching,
    data,
    // myProfileData: data,
  };
}

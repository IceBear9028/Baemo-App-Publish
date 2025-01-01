import {useQuery} from '@tanstack/react-query';
import {fetchGetCommunityCategory} from '../api/fetchGetCommunityCategory.ts';
import {useEffect} from 'react';

export function useFetchCommunityCategoryList() {
  const {isFetching, isError, error, data, refetch} = useQuery({
    queryKey: ['fetchGetCommunityCategory'],
    queryFn: fetchGetCommunityCategory,
    select: response => {
      if (response.code === 'SUCCESS-02') {
        return response.payload;
      }
    },
    throwOnError: true,
  });

  useEffect(() => {
    if (error) {
      console.log('에러 발생', error.response?.data);
    }
  }, [error, data]);

  return {
    isFetching,
    isError,
    data,
    refetch,
  };
}

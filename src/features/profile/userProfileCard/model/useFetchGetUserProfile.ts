import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchGetUserProfile} from '../api/fetchGetUserProfile';

export const userProfileQueryKey = ['fetchGetUserProfile'];

export function useFetchGetUserProfile(userId: number) {
  const {isFetching, isError, data, error} = useQuery({
    queryKey: [...userProfileQueryKey, userId],
    queryFn: () => fetchGetUserProfile(userId),
  });

  useEffect(() => {
    if (error && error.response?.data.code === 'USER-01') {
      Alert.alert(`${error.response?.data.payload}`);
    }
  }, [isError]);

  return {
    isError,
    isFetching,
    userProfileData: data,
  };
}

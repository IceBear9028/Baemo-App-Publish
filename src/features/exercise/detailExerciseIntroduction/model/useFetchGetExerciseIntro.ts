import {useQuery} from '@tanstack/react-query';
import {fetchGetExerciseIntro} from '../api/exerciseInfo.ts';
import {useEffect} from 'react';
import {useExerciseRoleStore} from '../model/useExerciseRoleStore';

export const exerciseIntroQueryKey = ['fetchGetExerciseIntro'];

export function useFetchGetExerciseIntro(exerciseId: number) {
  const {loadRole, resetRole} = useExerciseRoleStore();
  const {isFetching, isError, error, data} = useQuery({
    queryKey: [...exerciseIntroQueryKey, exerciseId],
    queryFn: () => fetchGetExerciseIntro(exerciseId),
    throwOnError: true,
  });

  useEffect(() => {
    if (data) {
      loadRole(exerciseId, data.exerciseRole, data.groupsRole, data.exerciseStatus, data.exerciseType);
      return;
    }
    if (error) {
      resetRole();
      return;
    }
  }, [error, data, exerciseId]);

  return {
    isError,
    isFetching,
    data,
  };
}

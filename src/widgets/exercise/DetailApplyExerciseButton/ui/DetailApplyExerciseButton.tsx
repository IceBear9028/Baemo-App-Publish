import {Fragment} from 'react';
import {ExerciseIntro} from '~/shared/mapper/exercise';
import {ApplyExerciseButton, ApplyGuestPlayerButton, NotRecruitingExerciseButton, PendingExerciseButton} from './ApplyExerciseButton.tsx';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface DetailApplyGroupButtonProps extends Pick<ExerciseIntro, 'exerciseId'> {}

export const DetailApplyExerciseButton = ({exerciseId}: DetailApplyGroupButtonProps) => {
  const {role, type, status, groupRole} = useExerciseRoleStore();

  if (role === 'NON_PARTICIPANT') {
    // 모집 끝
    if (status === 'COMPLETE') {
      return <NotRecruitingExerciseButton />;
    }
    // 모집 중 + 번개운동
    if (type === 'IMPROMPTU') {
      return <ApplyExerciseButton exerciseId={exerciseId} exerciseType={type} />;
    }
    // 모집 중 + 모임운동
    if (groupRole === 'NON_MEMBER' || groupRole === 'PENDING') {
      return <ApplyGuestPlayerButton exerciseId={exerciseId} />;
    }

    // 모집 중 + 모임운동 + 모임원
    return <ApplyExerciseButton exerciseId={exerciseId} exerciseType={type} />;
  }

  if (role === 'PENDING') {
    return <PendingExerciseButton />;
  }

  return <Fragment />;
};

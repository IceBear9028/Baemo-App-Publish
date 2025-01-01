import {Fragment} from 'react';
import {AdminMenu} from '../ui/AdminMenu.tsx';
import {MemberMenu} from '../ui/MemberMenu.tsx';
import {Exercise} from '~/shared/mapper/exercise';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface DetailExerciseMenuProps extends Pick<Exercise, 'exerciseId'> {}

export const DetailExerciseMenu = ({exerciseId}: DetailExerciseMenuProps) => {
  const {role, status} = useExerciseRoleStore();
  switch (role) {
    case 'ADMIN':
      return <AdminMenu exerciseId={exerciseId} exerciseStatus={status} />;
    case 'PARTICIPANT':
      return <MemberMenu exerciseId={exerciseId} exerciseStatus={status} />;
    default:
      return <Fragment />;
  }
};

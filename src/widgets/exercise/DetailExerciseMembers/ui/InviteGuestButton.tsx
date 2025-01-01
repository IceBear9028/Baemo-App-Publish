import React, {Fragment} from 'react';
import {useMainNavigate} from '~/shared/route';
import {FabButton, FabButtonContainer} from '~/shared/ui';
import {FabIcon, AddIcon} from '@gluestack-ui/themed';
import {ExerciseIntro} from '~/shared/mapper/exercise';

interface InviteGuestButtonProps {
  exerciseId: number;
  status: ExerciseIntro['exerciseStatus'];
  groupRole: ExerciseIntro['groupsRole'];
}

export const InviteGuestButton = ({exerciseId, groupRole, status}: InviteGuestButtonProps) => {
  const allowGroupRole = ['MEMBER', 'ADMIN', 'MANAGER'];
  const allowStatus = ['RECRUITMENT_FINISHED', 'RECRUITING', 'PROGRESS'];
  const {navigateInviteGuestExercise} = useMainNavigate();

  if (groupRole && allowGroupRole.includes(groupRole)) {
    if (allowStatus.includes(status)) {
      return (
        <FabButtonContainer>
          <FabButton title={'게스트 초대'} icon={<FabIcon as={AddIcon} />} onPress={() => navigateInviteGuestExercise({exerciseId})} />
        </FabButtonContainer>
      );
    }
  }

  return <Fragment />;
};

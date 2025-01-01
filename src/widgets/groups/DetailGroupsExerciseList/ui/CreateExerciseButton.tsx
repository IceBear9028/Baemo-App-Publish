import styled from 'styled-components/native';
import {FabButton} from '~/shared/ui';
import {AddIcon, FabIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {Groups} from '~/shared/mapper/groups';

interface CreateExerciseButtonProps {
  group: Groups;
}

export const CreateExerciseButton = ({group}: CreateExerciseButtonProps) => {
  const {navigateCreateGroupExercise} = useMainNavigate();
  return (
    <FabButtonContainer>
      <FabButton icon={<FabIcon as={AddIcon} />} title={'운동'} onPress={() => navigateCreateGroupExercise(group)} />
    </FabButtonContainer>
  );
};

const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 4px;
`;

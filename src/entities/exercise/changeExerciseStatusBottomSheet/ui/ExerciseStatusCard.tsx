import {CheckIcon, Icon, Text} from '@gluestack-ui/themed';
import {ExerciseStatus} from '~/shared/mapper/exercise';
import {CategoryButton, ExerciseStatusBadge} from '~/shared/ui';
import styled from 'styled-components/native';

interface RoleStatusCardProps {
  exerciseStatus: {
    status: keyof ExerciseStatus;
    text: ExerciseStatus[keyof ExerciseStatus];
  };
  isSelect?: boolean;
  onPress?: () => void;
}

export const ExerciseStatusCard = ({onPress, exerciseStatus, isSelect}: RoleStatusCardProps) => {
  function pressEvent() {
    onPress && onPress();
  }
  return (
    <CategoryButton onPress={pressEvent} showArrowIcon={false} icon={<ExerciseStatusBadge status={exerciseStatus.status} />}>
      <StyledBody>
        <Text bold>{exerciseStatus.text}</Text>
        {isSelect && <Icon as={CheckIcon} w="$4" h="$4" />}
      </StyledBody>
    </CategoryButton>
  );
};

const StyledBody = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

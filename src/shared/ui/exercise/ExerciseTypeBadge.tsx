import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';
import BoltIcon from '~/shared/images/svg/exercise_bolt.svg';
import GroupIcon from '~/shared/images/svg/exercise_groups.svg';
import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';

interface ExerciseTypeBadgeProps {
  exerciseType?: Exercise['exerciseType'];
}

const typeOption = {
  IMPROMPTU: {statusMessage: '번개운동', icon: <BoltIcon />},
  CLUB: {statusMessage: '모임운동', icon: <GroupIcon />},
};

export const ExerciseTypeBadge = ({exerciseType}: ExerciseTypeBadgeProps) => {
  const {statusMessage, icon} = exerciseType ? typeOption[exerciseType] : typeOption['IMPROMPTU'];
  const backgroundToken = useToken('colors', 'blueGray100');
  return (
    <StyledContainer background={backgroundToken}>
      {icon}
      <Text size={'xs'} bold={true}>
        {statusMessage}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{background: string}>`
  display: flex;
  flex-direction: row;
  width: 80px;
  height: 20px;
  gap: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: ${({background}) => background};
`;

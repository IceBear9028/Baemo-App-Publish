import GroupIcon from '~/shared/images/svg/exercise_group_outlined.svg';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';

interface ExerciseHeadCountBadgeProps extends Pick<Exercise, 'headCount'> {
  currentHeadCount?: number;
}

export const HeadCountBadge = ({headCount, currentHeadCount}: ExerciseHeadCountBadgeProps) => {
  const isEmptyCurrentHeadCount = currentHeadCount === undefined;
  if (isEmptyCurrentHeadCount) {
    return (
      <StyledContainer>
        <GroupIcon />
        <Text size={'2xs'} bold={true}>
          {`${headCount} 명`}
        </Text>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <GroupIcon />
      <Text size={'2xs'} bold={true}>
        {`${currentHeadCount} / ${headCount} 명`}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

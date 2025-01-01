import {Text} from '@gluestack-ui/themed';
import {ExerciseRegularType} from '~/shared/mapper/exercise';
import RepeatIcon from '~/shared/images/svg/exercise_repeat.svg';
import styled from 'styled-components/native';

const RegularDayOptionKey = {
  0: '',
  1: '매주 월요일',
  2: '매주 화요일',
  3: '매주 수요일',
  4: '매주 목요일',
  5: '매주 금요일',
  6: '매주 토요일',
  7: '매주 일요일',
};

interface ExerciseRegularDayBadgeProps {
  regularDay: ExerciseRegularType;
}

export const RegularDayBadge = ({regularDay}: ExerciseRegularDayBadgeProps) => {
  const everyWeekDay = RegularDayOptionKey[regularDay];
  return (
    <StyledContainer>
      <RepeatIcon />
      <Text size={'2xs'} bold={true}>
        {everyWeekDay}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

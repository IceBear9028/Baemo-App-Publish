import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Text} from '@gluestack-ui/themed';
import {ExerciseStatus} from '~/shared/mapper/exercise';

interface ExerciseStatusBadgeProps {
  status?: keyof ExerciseStatus;
}

const badgeOptionKey = {
  RECRUITING: {background: '#f3e8ff', textColor: '#7e22ce', statusMessage: '모집중'},
  RECRUITMENT_FINISHED: {background: '#e0e7ff', textColor: '#4338ca', statusMessage: '모집완료'},
  PROGRESS: {background: '#fef3c7', textColor: '#b45309', statusMessage: '운동중'},
  COMPLETE: {background: '#E5E5E5', textColor: '#525252', statusMessage: '완료'},
};

export const ExerciseStatusBadge = ({status}: ExerciseStatusBadgeProps) => {
  const {background, textColor, statusMessage} = badgeOptionKey[status ? status : 'RECRUITING'];
  const backgroundToken = useToken('colors', background as any);
  return (
    <StyledContainer background={backgroundToken}>
      <Text bold size={'xs'} color={textColor}>
        {statusMessage}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{background: string}>`
  display: flex;
  width: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${({background}) => background};
  border-radius: 10px;
`;

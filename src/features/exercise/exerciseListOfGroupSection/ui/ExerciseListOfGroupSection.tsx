import {Heading, Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useMainNavigate} from '~/shared/route';
import {useFetchGetExerciseListOfGroup} from '../model/useFetchGetExerciseListOfGroup';
import {LoadingPageSpinner} from '~/shared/ui';
import {Groups} from '~/shared/mapper/groups';
import {Fragment} from 'react';

interface ExerciseListOfGroupSection extends Pick<Groups, 'groupsId'> {}

const FallbackExerciseEmpty = () => {
  return (
    <StyledFallback>
      <Text>{'진행중인 운동이 없습니다.'}</Text>
    </StyledFallback>
  );
};

export const ExerciseListOfGroupSection = ({groupsId}: ExerciseListOfGroupSection) => {
  const {navigateDetailExercise} = useMainNavigate();
  const {isFetching, data} = useFetchGetExerciseListOfGroup(groupsId);

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledHeaderContainer>
            <StyledTitleGroup>
              <Heading size={'md'} color={'$textLight950'}>
                다음 모임 운동
              </Heading>
            </StyledTitleGroup>
          </StyledHeaderContainer>
          <StyledCardList>
            {data.length <= 0 ? (
              <FallbackExerciseEmpty />
            ) : (
              data.map((exercise, index) => (
                <ExerciseCard key={`${index}--`} {...exercise} onPress={() => navigateDetailExercise(exercise.exerciseId)} />
              ))
            )}
          </StyledCardList>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledTitleGroup = styled.View`
  gap: 4px;
`;

const StyledContainer = styled.View`
  padding: 20px 20px 60px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;

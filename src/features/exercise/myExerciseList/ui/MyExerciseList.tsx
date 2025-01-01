import {Fragment} from 'react';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {Heading, Text} from '@gluestack-ui/themed';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useFetchGetMyExerciseList} from '../model/useFetchGetMyExerciseList.ts';

const FallbackExerciseEmpty = () => {
  return (
    <StyledFallback>
      <Text>참가한 운동이 없습니다.</Text>
    </StyledFallback>
  );
};

export const MyExerciseListOfGroup = () => {
  const {navigateDetailExercise} = useMainNavigate();
  const {data} = useFetchGetMyExerciseList();

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledContentsContainer>
            <StyledHeaderContainer>
              <StyledTitleGroup>
                <Heading size={'md'} color={'$textLight950'}>
                  다가오는 모임 운동
                </Heading>
              </StyledTitleGroup>
            </StyledHeaderContainer>
            <StyledCardList>
              {data.myClubExercises.length <= 0 ? (
                <FallbackExerciseEmpty />
              ) : (
                data.myClubExercises.map((exercise, index) => (
                  <ExerciseCard key={`${index}--`} onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />
                ))
              )}
            </StyledCardList>
          </StyledContentsContainer>
          <StyledDivider />
        </StyledContainer>
      )}
    </Fragment>
  );
};

export const MyExerciseListOfParticipate = () => {
  const {navigateDetailExercise} = useMainNavigate();
  const {data} = useFetchGetMyExerciseList();

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledContentsContainer>
            <StyledHeaderContainer>
              <StyledTitleGroup>
                <Heading size={'md'} color={'$textLight950'}>
                  내가 참가한 운동
                </Heading>
              </StyledTitleGroup>
            </StyledHeaderContainer>
            <StyledCardList>
              {data.myParticipatedExercises.length <= 0 ? (
                <FallbackExerciseEmpty />
              ) : (
                data.myParticipatedExercises.map((exercise, index) => (
                  <ExerciseCard key={`${index}--`} {...exercise} onPress={() => navigateDetailExercise(exercise.exerciseId)} />
                ))
              )}
            </StyledCardList>
          </StyledContentsContainer>
        </StyledContainer>
      )}
    </Fragment>
  );
};

export const MyExerciseListOfUpcoming = ({region}: {region?: string}) => {
  const {navigateDetailExercise} = useMainNavigate();
  const {data} = useFetchGetMyExerciseList();

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledContentsContainer>
            <StyledHeaderContainer>
              <StyledTitleGroup>
                <Heading size={'md'} color={'$textLight950'}>
                  다가오는 운동
                </Heading>
                <Text size={'sm'} bold={true}>
                  {region}
                </Text>
              </StyledTitleGroup>
            </StyledHeaderContainer>
            <StyledCardList>
              {data.myUpcomingExercise.length <= 0 ? (
                <FallbackExerciseEmpty />
              ) : (
                data.myUpcomingExercise.map((exercise, index) => (
                  <ExerciseCard key={`${index}--`} onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />
                ))
              )}
            </StyledCardList>
          </StyledContentsContainer>
          <StyledDivider />
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding-bottom: 8px;
`;

const StyledDivider = styled.View`
  height: 8px;
  background: #f6f6f6;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledTitleGroup = styled.View`
  gap: 4px;
`;

const StyledContentsContainer = styled.View`
  padding: 20px 20px 10px 20px;
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

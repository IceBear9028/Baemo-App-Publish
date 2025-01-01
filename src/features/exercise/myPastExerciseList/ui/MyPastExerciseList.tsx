import {Fragment} from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useFetchGetMyExercise} from '../model/useFetchGetMyExercise.ts';

export const MyPastExerciseList = () => {
  const {navigateDetailExercise} = useMainNavigate();
  const {isFetching, myPastExerciseList} = useFetchGetMyExercise();

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  if (myPastExerciseList && myPastExerciseList.length <= 0) {
    return (
      <StyledFallback>
        <Text>진행한 운동이 없습니다.</Text>
      </StyledFallback>
    );
  }

  return (
    <Fragment>
      {myPastExerciseList && (
        <StyledContainer>
          <StyledScrollContainer>
            {myPastExerciseList.map(exercise => {
              return <ExerciseCard onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />;
            })}
          </StyledScrollContainer>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledScrollContainer = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const StyledContainer = styled.View`
  flex: 1;
  padding: 16px 20px 0 20px;
`;

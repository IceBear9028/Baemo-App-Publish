import React, {Fragment} from 'react';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useFetchGetHomeExerciseList} from '../model/useFetchGetHomeExerciseList.tsx';

const FallbackEmpty = () => {
  return (
    <StyledFallback>
      <Text>운동이 없습니다.</Text>
    </StyledFallback>
  );
};

export const HomeExerciseList = () => {
  const {navigateDetailExercise, navigateAllExerciseListPage} = useMainNavigate();
  const {isFetching, homeExerciseList} = useFetchGetHomeExerciseList();

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  return (
    <Fragment>
      {homeExerciseList && (
        <StyledContainer>
          <StyledHeaderContainer>
            <Heading size={'md'} color={'$textLight950'}>
              새로 생긴 운동
            </Heading>
            <Button size={'sm'} variant={'link'} action={'secondary'} onPress={navigateAllExerciseListPage}>
              <ButtonText>더보기</ButtonText>
            </Button>
          </StyledHeaderContainer>
          <StyledCardList>
            {homeExerciseList.length <= 0 ? (
              <FallbackEmpty />
            ) : (
              homeExerciseList.map(exercise => {
                return <ExerciseCard onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />;
              })
            )}
          </StyledCardList>
        </StyledContainer>
      )}
      <StyledDivider />
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 20px 20px 16px 20px;
  gap: 8px;
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

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;

import {Exercise} from '~/shared/mapper/exercise';
import styled from 'styled-components/native';
import React, {Fragment} from 'react';
import {Heading, Text} from '@gluestack-ui/themed';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useMainNavigate} from '~/shared/route';

interface ExerciseListProps {
  list: Exercise[];
}

export const ExerciseList = ({list}: ExerciseListProps) => {
  const {navigateDetailExercise} = useMainNavigate();
  return (
    <Fragment>
      <StyledContainer>
        <StyledHeaderContainer>
          <Heading size={'md'} color={'$textLight950'}>
            운동 검색 결과
          </Heading>
        </StyledHeaderContainer>
        <StyledCardList>
          {list.length <= 0 ? (
            <StyledFallback>
              <Text>검색된 운동이 없습니다.</Text>
            </StyledFallback>
          ) : (
            list.map(exercise => {
              return <ExerciseCard onPress={() => navigateDetailExercise(exercise.exerciseId)} {...exercise} />;
            })
          )}
        </StyledCardList>
      </StyledContainer>
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 20px 20px 16px 20px;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledDivider = styled.View`
  height: 8px;
  background: #f6f6f6;
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

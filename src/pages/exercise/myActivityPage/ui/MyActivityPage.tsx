import React from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {MyGroupsList} from '~/features/groups/myGroupsList';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {useRefreshMyActivity} from '~/pages/exercise/myActivityPage/model/useRefreshMyActivity.ts';
import {MyExerciseListOfGroup, MyExerciseListOfParticipate, MyExerciseListOfUpcoming} from '~/features/exercise/myExerciseList';

export const MyActivityPage = () => {
  return (
    <ApiErrorBoundary>
      <MyActivityFeatureContainer />
    </ApiErrorBoundary>
  );
};

export const MyActivityFeatureContainer = () => {
  const {isFetching, refresh} = useRefreshMyActivity();
  return (
    <StyledContainer>
      <StyledScrollContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
        <MyGroupsList />
        <MyExerciseListOfParticipate />
        <MyExerciseListOfGroup />
      </StyledScrollContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView``;

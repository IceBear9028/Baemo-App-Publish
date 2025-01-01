import styled from 'styled-components/native';
import {MyPastExerciseList} from '~/features/exercise/myPastExerciseList';
import {RefreshControl} from 'react-native';
import React from 'react';
import {useRefreshMyExerciseList} from '../model/useRefreshMyExerciseList.ts';

export const MyExerciseList = () => {
  const {isFetching, refresh} = useRefreshMyExerciseList();

  // const {filterStatus, filterOptions, onChangeFilter} = useFilterMyExercise();
  return (
    <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
      {/*<Filter initOption={filterStatus} onChange={onChangeFilter}>*/}
      {/*  <FilterOption name={'1주일 전'} value={filterOptions[0]} />*/}
      {/*  <FilterOption name={'1달 전'} value={filterOptions[1]} />*/}
      {/*  <FilterOption name={'3달 전'} value={filterOptions[2]} />*/}
      {/*</Filter>*/}
      <MyPastExerciseList />
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  flex: 1;
`;

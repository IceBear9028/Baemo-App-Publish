import React from 'react';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useFetchInfiniteExerciseList} from '../model/useFetchInfiniteExerciseList.ts';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';

export const AllExerciseListPage = () => {
  const {navigateDetailExercise} = useMainNavigate();
  const {exerciseList, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isFetching} = useFetchInfiniteExerciseList();

  return (
    <ApiErrorBoundary>
      <FlatList
        data={exerciseList?.pages.flatMap(page => page)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        keyExtractor={(item, id) => `${item.exerciseId}-${id}`}
        renderItem={({item}) => {
          const navigateDetail = () => {
            navigateDetailExercise(item.exerciseId);
          };
          return (
            <StyledCardContainer key={`${item.exerciseId}-${item.name}`}>
              <ExerciseCard onPress={navigateDetail} {...item} />
            </StyledCardContainer>
          );
        }}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.8}
        ListFooterComponent={() => (isFetchingNextPage ? <ActivityIndicator style={styles.indicatorStyle} /> : <StyledFooterDivider />)}
      />
    </ApiErrorBoundary>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const StyledFooterDivider = styled.View`
  height: 86px;
`;

const StyledCardContainer = styled.View`
  padding: 4px 20px;
`;

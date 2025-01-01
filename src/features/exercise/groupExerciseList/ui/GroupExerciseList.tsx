import React, {Fragment} from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {ExerciseCard} from '~/entities/exercise/exerciseCard';
import {useFetchGetExerciseList} from '../model/useFetchGetExerciseList.ts';
import {LoadingPageSpinner} from '~/shared/ui';
import {ExerciseStatus} from '~/shared/mapper/exercise';
import {useRefreshGroupExerciseList} from '~/features/exercise/groupExerciseList/model/useRefreshGroupExerciseList.ts';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {GroupArticleCard} from '~/features/groups/groupArticleCard';

interface GroupExerciseListProps {
  groupsId: number;
  filterKey: keyof ExerciseStatus | 'ALL';
}

export const GroupExerciseList = ({groupsId, filterKey}: GroupExerciseListProps) => {
  const {navigateDetailExercise} = useMainNavigate();
  const {isPending, refresh} = useRefreshGroupExerciseList();
  const {groupExerciseList, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isFetched, isFetching} =
    useFetchGetExerciseList(groupsId);

  if (!isFetched) {
    return <LoadingPageSpinner />;
  }

  if (!groupExerciseList?.pages[0].length) {
    return (
      <StyledFallback>
        <StyledFallbackScroll refreshControl={<RefreshControl refreshing={isPending} onRefresh={refresh} />}>
          <StyledPadding />
          <Text>모임내의 운동이 없습니다.</Text>
        </StyledFallbackScroll>
      </StyledFallback>
    );
  }
  return (
    <FlatList
      data={groupExerciseList?.pages.flatMap(page => page)}
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
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const StyledFallbackScroll = styled.ScrollView``;

const StyledCardContainer = styled.View`
  padding: 4px 20px;
`;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledPadding = styled.View`
  height: 280px;
`;

const StyledFooterDivider = styled.View`
  height: 86px;
`;

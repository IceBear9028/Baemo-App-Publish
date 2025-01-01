import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useFetchInfiniteGroupList} from '../model/useFetchInfiniteGroupList.ts';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {GroupsListCard} from '~/entities/groups/groupsCard';
import {useMainNavigate} from '~/shared/route';

export const AllGroupsListPage = () => {
  const {navigateDetailGroup} = useMainNavigate();
  const {groupList, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isFetching} = useFetchInfiniteGroupList();

  return (
    <ApiErrorBoundary>
      <FlatList
        data={groupList?.pages.flatMap(page => page)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        keyExtractor={(item, id) => `${item.groupsId}-${id}`}
        renderItem={({item}) => {
          const navigateDetail = () => {
            navigateDetailGroup(item.groupsId);
          };
          return (
            <StyledCardContainer key={`${item.groupsId}-${item.groupsName}`}>
              <GroupsListCard onPress={navigateDetail} {...item} />
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

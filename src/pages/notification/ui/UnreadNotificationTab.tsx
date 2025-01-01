import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useFetchGetUnreadNotificationList} from '~/features/notification/notificationList';
import {NotificationPageTabRoute} from '../ui/NotificationPage.tsx';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {NotificationListCard} from '~/entities/notification';

interface UnreadNotificationTabPageProps {
  route: RouteProp<NotificationPageTabRoute, 'unreadNotification'>;
  navigation: any;
}

export const UnreadNotificationTab = ({route}: UnreadNotificationTabPageProps) => {
  const {notificationList, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isFetching} = useFetchGetUnreadNotificationList();
  return (
    <ApiErrorBoundary>
      <FlatList
        data={notificationList?.pages.flatMap(page => page)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        keyExtractor={(item, id) => `${item.id}-${id}`}
        renderItem={({item}) => {
          return (
            <StyledCardContainer key={item.id}>
              <NotificationListCard {...item} />
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
        ListEmptyComponent={() => (
          <StyledFallbackContainer>
            <Text>알림이 없습니다.</Text>
          </StyledFallbackContainer>
        )}
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

const StyledFallbackContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const StyledFooterDivider = styled.View`
  height: 86px;
`;

const StyledCardContainer = styled.View`
  padding: 0 20px;
`;

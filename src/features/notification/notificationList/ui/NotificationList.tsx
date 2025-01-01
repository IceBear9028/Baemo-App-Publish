import styled from 'styled-components/native';

import {NotificationListCard} from '~/entities/notification';
import {LoadingPageSpinner} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';

import {useFetchGetAllNotificationList} from '../model/useFetchGetAllNotificationList.ts';
import {useEffect} from 'react';
import {NotificationList as NotificationListType} from '~/shared/mapper/notification';

interface NotiListPropsType {
  list?: NotificationListType[];
}

export const NotificationList = ({list}: NotiListPropsType) => {
  if (list && list.length <= 0) {
    return (
      <StyledFallback>
        <Text>알림이 없습니다.</Text>
      </StyledFallback>
    );
  }

  return (
    <StyledScrollContainer>
      {list &&
        list?.map(item => (
          <NotificationListCard
            key={item.id}
            id={item.id}
            domain={item.domain}
            domainId={item.domainId}
            title={item.title}
            body={item.body}
            createdDate={item.createdDate}
            isRead={item.isRead}
          />
        ))}
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView``;
const StyledFallback = styled.View`
  height: auto;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

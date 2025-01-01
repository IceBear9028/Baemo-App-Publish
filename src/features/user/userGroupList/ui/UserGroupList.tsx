import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {Fragment} from 'react';
import {UserProfileTabBarRoute} from '~/pages/profile/userProfilePage/ui/UserProfilePage.tsx';
import {LoadingPageSpinner} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';
import {useFetchGetUserGroupList} from '~/features/user/userGroupList/model/useFetchGetUserGroupList.ts';
import {GroupsListCard} from '~/entities/groups/groupsCard';

type UserGroupListProps = RouteProp<UserProfileTabBarRoute, 'userGroups'>;

const FallbackEmpty = () => {
  return (
    <StyledFallback>
      <Text>참가한 모임이 없습니다.</Text>
    </StyledFallback>
  );
};

export const UserGroupList = () => {
  const route = useRoute<UserGroupListProps>();
  const {userId} = route.params;

  const {navigateDetailGroup} = useMainNavigate();
  const {isFetching, isError, data} = useFetchGetUserGroupList(userId);

  if (isFetching) {
    return <LoadingPageSpinner />;
  }

  if (isError) {
    return <LoadingPageSpinner />;
  }

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <StyledCardList>
            {data.length <= 0 ? (
              <FallbackEmpty />
            ) : (
              data.map((group, index) => (
                <GroupsListCard key={`${index}--`} {...group} onPress={() => navigateDetailGroup(group.groupsId)} />
              ))
            )}
          </StyledCardList>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.ScrollView`
  padding: 10px 20px;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
  margin-bottom: 20px;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;

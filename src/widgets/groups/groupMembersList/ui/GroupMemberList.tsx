import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {Groups} from '~/shared/mapper/groups';
import {LoadingPageSpinner} from '~/shared/ui';
import {GroupMemberCard} from 'features/groups/groupMemberCard';
import {useFetchGetGroupMembers} from '../model/useFetchGetGroupMembers.ts';
import {useRefreshGroupMemberList} from '~/widgets/groups/groupMembersList/model/useRefreshGroupMemberList.ts';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';

interface GroupMemberListProps extends Pick<Groups, 'groupsId'> {}

export const GroupMemberList = ({groupsId}: GroupMemberListProps) => {
  const {isFetching, data} = useFetchGetGroupMembers(groupsId);
  const {isPending, refreshList} = useRefreshGroupMemberList();
  const {role} = useGroupRoleStore();
  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  if (!data?.length) {
    return (
      <StyledContainer>
        <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refreshList} />}>
          <StyledPadding />
          <Text size={'sm'}>아직 회원이 없습니다.</Text>
        </StyledScrollContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledScrollContainer refreshControl={<RefreshControl refreshing={isPending} onRefresh={refreshList} />}>
      {data &&
        data.map((groupUser, index) => (
          <GroupMemberCard myRole={role} key={`${index}-${groupUser.memberStatus}`} groupsId={groupsId} {...groupUser} />
        ))}
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
`;

const StyledContainer = styled.View``;

const StyledList = styled.View``;

const StyledPadding = styled.View`
  height: 320px;
`;

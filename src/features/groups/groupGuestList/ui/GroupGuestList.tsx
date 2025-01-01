import styled from 'styled-components/native';
import {useJoinGroupRequestMemberList} from '~/features/groups/groupGuestList/model/useJoinGroupRequestMemberList.ts';
import {Text} from '@gluestack-ui/themed';
import {AcceptUserCard} from '~/shared/ui/common/AcceptUserCard.tsx';
import {LoadingPageSpinner} from '~/shared/ui';
import React from 'react';
import {Groups} from '~/shared/mapper/groups';
import {useFetchAcceptMember} from '~/features/groups/groupGuestList/model/useFetchAcceptMember.ts';
import {useRefreshApplicantList} from '~/features/groups/groupGuestList/model/useRefreshApplicantList.ts';
import {RefreshControl} from 'react-native';

interface GroupGuestListProps extends Pick<Groups, 'groupsId'> {}

export const GroupGuestList = ({groupsId}: GroupGuestListProps) => {
  const {acceptMember, rejectMember} = useFetchAcceptMember();
  const {isFetching, refreshList} = useRefreshApplicantList(groupsId);
  const {isError, isPending, data} = useJoinGroupRequestMemberList(groupsId);
  if (isError) {
    return <Text>에러 발생</Text>;
  }
  if (isPending) {
    return <LoadingPageSpinner />;
  }
  // 데이터가 없는 경우
  if (!data?.length) {
    return (
      <StyledFallback>
        <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshList} />}>
          <StyledPadding />
          <Text size={'sm'}>신청자가 없습니다.</Text>
        </StyledContainer>
      </StyledFallback>
    );
  }

  return (
    <StyledContainer refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshList} />}>
      {data &&
        data.map((item, index) => {
          const {userId} = item;
          const accept = () => acceptMember(groupsId, userId);
          const reject = () => rejectMember(groupsId, userId);
          return <AcceptUserCard key={`${index}-${item.name}`} onAccept={accept} onReject={reject} {...item} />;
        })}
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledPadding = styled.View`
  height: 320px;
`;

import React from 'react';
import styled from 'styled-components/native';
import {Groups} from '~/shared/mapper/groups';
import {Heading} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {LoadingPageSpinner} from '~/shared/ui';
import {GroupsCard} from '~/entities/groups/groupsCard';
import {useFetchGetMyGroups} from '../model/useFetchGetMyGroups.ts';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <StyledTitleGroup>
        <Heading size={'md'} color={'$textLight950'}>
          내가 참가한 모임
        </Heading>
      </StyledTitleGroup>
    </StyledHeaderContainer>
  );
};

export const MyGroupsList = () => {
  const {isFetching, data} = useFetchGetMyGroups();
  const {navigateDetailGroup} = useMainNavigate();
  function pressEvent(input: Groups) {
    navigateDetailGroup(input.groupsId);
  }

  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  return (
    <StyledContainer>
      <Header />
      <StyledCardScrollContainer horizontal={true} showsHorizontalScrollIndicator={false}>
        <StyledCardList>
          {data && data.payload.map((groups, index) => <GroupsCard key={`card-${index}`} onPress={() => pressEvent(groups)} {...groups} />)}
        </StyledCardList>
      </StyledCardScrollContainer>
    </StyledContainer>
  );
};

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledTitleGroup = styled.View`
  gap: 4px;
`;

const StyledContainer = styled.View`
  padding: 20px 20px 0 20px;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
`;

const StyledCardScrollContainer = styled.ScrollView`
  overflow: visible;
  flex-direction: row;
  gap: 8px;
  align-self: stretch;
`;

const StyledCardList = styled.View`
  flex-direction: row;
  gap: 12px;
`;

import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {Groups} from '~/shared/mapper/groups';
import {useMainNavigate} from '~/shared/route';
import {Heading, Text} from '@gluestack-ui/themed';
import {GroupsListCard} from '~/entities/groups/groupsCard';

interface GroupListProps {
  list: Groups[];
}

export const GroupList = ({list}: GroupListProps) => {
  const {navigateDetailGroup} = useMainNavigate();
  return (
    <Fragment>
      <StyledContainer>
        <StyledHeaderContainer>
          <Heading size={'md'} color={'$textLight950'}>
            모임 검색 결과
          </Heading>
        </StyledHeaderContainer>
        <StyledCardList>
          {list.length <= 0 ? (
            <StyledFallback>
              <Text>검색된 모임이 없습니다.</Text>
            </StyledFallback>
          ) : (
            list.map(group => {
              return <GroupsListCard onPress={() => navigateDetailGroup(group.groupsId)} {...group} />;
            })
          )}
        </StyledCardList>
      </StyledContainer>
      <StyledDivider />
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 20px 20px 16px 20px;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
`;

const StyledDivider = styled.View`
  height: 8px;
  background: #f6f6f6;
`;

const StyledCardList = styled.View`
  gap: 8px;
  align-self: stretch;
`;

const StyledFallback = styled.View`
  justify-content: center;
  align-items: center;
  height: 160px;
`;

import React from 'react';
import styled from 'styled-components/native';
import LeaderIcon from '~/shared/images/svg/group_leader.svg';
import OperatorIcon from '~/shared/images/svg/group_operator.svg';
import {GroupRole} from '~/shared/mapper/groups';
import {Text} from '@gluestack-ui/themed';

interface GroupMemberStatusProps {
  status: keyof GroupRole;
}

const LeaderBadge = () => {
  return (
    <StyledContainer $background={'#fefce8'}>
      <LeaderIcon />
      <Text size={'xs'} bold={true}>
        모임장
      </Text>
    </StyledContainer>
  );
};

const OperatorBadge = () => {
  return (
    <StyledContainer $background={'#faf5ff'}>
      <OperatorIcon />
      <Text size={'xs'} bold={true}>
        운영자
      </Text>
    </StyledContainer>
  );
};

export const GroupMemberStatusBadge = ({status}: GroupMemberStatusProps) => {
  switch (status) {
    case 'ADMIN':
      return <LeaderBadge />;
    case 'MANAGER':
      return <OperatorBadge />;
    default:
      return <React.Fragment />;
  }
};

const StyledContainer = styled.View<{$background: string}>`
  background: ${({$background}) => $background};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70px;
  gap: 4px;
  height: 24px;
`;

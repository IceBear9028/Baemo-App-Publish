import React from 'react';
import styled from 'styled-components/native';
import LeaderIcon from '~/shared/images/svg/group_leader.svg';
import OperatorIcon from '~/shared/images/svg/group_operator.svg';
import {useToken} from '@gluestack-style/react';
import {Text} from '@gluestack-ui/themed';

type MemberStatusBadgeProps = {
  status: string;
};

const LeaderBadge = () => {
  const leaderColor = useToken('colors', 'yellow50');
  return (
    <StyledContainer background={leaderColor}>
      <LeaderIcon />
      <Text size={'xs'} bold={true}>
        모임장
      </Text>
    </StyledContainer>
  );
};

const OperatorBadge = () => {
  const operatorColor = useToken('colors', 'purple50');
  return (
    <StyledContainer background={operatorColor}>
      <OperatorIcon />
      <Text size={'xs'} bold={true}>
        운영자
      </Text>
    </StyledContainer>
  );
};

export const MemberStatusBadge = ({status}: MemberStatusBadgeProps) => {
  switch (status) {
    case 'ADMIN':
      return <LeaderBadge />;
    case 'MANAGER':
      return <OperatorBadge />;
    default:
      return <React.Fragment />;
  }
};

const StyledContainer = styled.View<{background: string}>`
  background: ${({background}) => background};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70px;
  gap: 4px;
  height: 24px;
`;

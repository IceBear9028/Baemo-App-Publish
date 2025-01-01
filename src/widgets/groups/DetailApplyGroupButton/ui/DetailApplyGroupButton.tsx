import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';
import {useFetchApplyGroup} from '../model/useFetchApplyGroup.ts';

interface DetailApplyGroupButtonProps {
  groupId: number;
}

export const DetailApplyGroupButton = ({groupId}: DetailApplyGroupButtonProps) => {
  const {role} = useGroupRoleStore();
  const {isPendingApply, applyGroup} = useFetchApplyGroup(groupId);
  switch (role) {
    case 'NON_MEMBER':
      return (
        <StyledContainer>
          <Button size={'lg'} onPress={() => applyGroup()}>
            {isPendingApply && <ButtonSpinner />}
            <ButtonText>모임 신청하기</ButtonText>
          </Button>
        </StyledContainer>
      );
    case 'PENDING':
      return (
        <StyledContainer>
          <Button size={'lg'} isDisabled={true}>
            {isPendingApply && <ButtonSpinner />}
            <ButtonText>승인 대기중...</ButtonText>
          </Button>
        </StyledContainer>
      );
    default:
      return <Fragment />;
  }
};

const StyledContainer = styled.View`
  padding: 0 20px 30px 20px;
`;

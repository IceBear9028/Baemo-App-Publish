import React from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useFetchApplyGroup} from '../model/useFetchApplyGroup.ts';

interface ApplyGroupButtonProps {
  groupId: number;
}

export const ApplyGroupButton = ({groupId}: ApplyGroupButtonProps) => {
  const {isPendingApply, applyGroup} = useFetchApplyGroup(groupId);
  return (
    <StyledContainer>
      <Button size={'lg'} onPress={() => applyGroup()}>
        {isPendingApply && <ButtonSpinner />}
        <ButtonText>모임 신청하기</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 0 20px 30px 20px;
`;

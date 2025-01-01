import React from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useStartBaemoModel} from '../model/useStartBaemoModel.ts';

export const StartBaemoButton = () => {
  const {isPending, fetchLogin} = useStartBaemoModel();
  return (
    <StyledButtonContainer>
      <Button size="lg" onPress={fetchLogin}>
        {isPending && <ButtonSpinner />}
        <ButtonText>BAEMO 시작하기</ButtonText>
      </Button>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.View`
  padding-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
`;

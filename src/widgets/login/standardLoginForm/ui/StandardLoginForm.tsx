import React from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useStandardLogin} from '../model/useStandardLogin.ts';

export const StandardLoginForm = () => {
  const {isPending, status, setPassword, setPhoneNumber, fetchLogin} = useStandardLogin();
  return (
    <StyledContainer>
      <InputContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">전화번호</Text>
          <Input variant="outline" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="01012345678" value={status.phone} onChangeText={setPhoneNumber} keyboardType={'number-pad'} />
          </Input>
        </VStack>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">비밀번호</Text>
          <Input variant="outline" size="lg">
            <InputField placeholder="비밀번호 입력" value={status.password} onChangeText={setPassword} type="password" />
          </Input>
        </VStack>
      </InputContainer>
      <Button size="lg" onPress={fetchLogin}>
        {isPending && <ButtonSpinner />}
        <ButtonText>로그인</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 32px;
`;

const InputContainer = styled.View`
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`;

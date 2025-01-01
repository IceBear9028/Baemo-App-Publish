import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {usePasswordStatus} from '../model/usePasswordStatus.ts';
import {useFetchResetPassword} from '../model/useFetchResetPassword.ts';

interface FindPasswordProps {
  phone: string;
}

export const FindPasswordResetForm = ({phone}: FindPasswordProps) => {
  const {isValidPassword, password, confirmPassword, errorMessage, setConfirmPassword, setPassword} = usePasswordStatus();
  const {isPendingReset, fetchResetPassword} = useFetchResetPassword();
  return (
    <StyledContainer>
      <StyledInputContainer>
        <Text color="$text700" size="sm">
          비밀번호 입력
        </Text>
        <StyledPasswordContainer>
          <VStack space="xs" style={{alignSelf: 'stretch'}}>
            <Input variant="outline" size="lg" isInvalid={isValidPassword}>
              <InputField type="password" placeholder="비밀번호 입력" value={password} onChangeText={text => setPassword(text)} />
            </Input>
          </VStack>
          <VStack space="xs" style={{alignSelf: 'stretch'}}>
            <Input variant="outline" size="lg" isInvalid={isValidPassword}>
              <InputField type="password" placeholder="비밀번호 확인" value={confirmPassword} onChangeText={setConfirmPassword} />
            </Input>
          </VStack>
        </StyledPasswordContainer>
        <Text size="sm">{errorMessage}</Text>
      </StyledInputContainer>
      <StyledButtonContainer>
        <Button size="lg" onPress={() => fetchResetPassword(phone, password)} isDisabled={isValidPassword}>
          {isPendingReset && <ButtonSpinner />}
          <ButtonText>비밀번호 변경</ButtonText>
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledInputContainer = styled.View`
  flex: 1;
  gap: 8px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledPasswordContainer = styled.View`
  gap: 16px;
`;

const StyledButtonContainer = styled.View`
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
`;

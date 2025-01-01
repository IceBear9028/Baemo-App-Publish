import React from 'react';
import styled from 'styled-components/native';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useValidPassword} from '../model/useValidPassword.ts';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const InitPasswordForm = () => {
  const {passwordConfirm, errorMessage, isValidPassword, setConfirmPassword} = useValidPassword();
  const {password, setChangePassword} = useSignUpUserInfoStore(info => ({
    password: info.store.password,
    setChangePassword: info.setPassword,
  }));
  return (
    <StyledContainer>
      <Text color="$textLight700" size="sm">
        비밀번호 입력
      </Text>
      <StyledPasswordContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Input variant="outline" size="lg" isInvalid={isValidPassword}>
            <InputField type="password" placeholder="비밀번호 입력" value={password} onChangeText={text => setChangePassword(text)} />
          </Input>
        </VStack>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Input variant="outline" size="lg" isInvalid={isValidPassword}>
            <InputField type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChangeText={setConfirmPassword} />
          </Input>
        </VStack>
      </StyledPasswordContainer>
      <Text size="sm">{errorMessage}</Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

const StyledPasswordContainer = styled.View`
  gap: 16px;
`;

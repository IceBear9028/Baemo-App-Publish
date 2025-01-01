import React from 'react';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const InputProfileDescription = () => {
  const {description, setDescription} = useSignUpUserInfoStore(store => ({
    description: store.store.description,
    setDescription: store.setDescription,
  }));
  return (
    <StyledContainer>
      <VStack space="xs" style={{alignSelf: 'stretch'}}>
        <Text color="$textLight600" size="sm">
          내 소개글
        </Text>
        <Input variant="outline" size="lg">
          <InputField placeholder="나를 나타내는 짧은 소개글을 작성해주세요." value={description} onChangeText={setDescription} />
        </Input>
      </VStack>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

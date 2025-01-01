import React from 'react';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const InputProfileNickName = () => {
  const {nickName, setNickName} = useSignUpUserInfoStore(store => ({
    nickName: store.store.nickName,
    setNickName: store.setNickName,
  }));
  return (
    <StyledContainer>
      <VStack space="xs" style={{alignSelf: 'stretch'}}>
        <Text color="$textLight600" size="sm">
          별명
        </Text>
        <Input variant="outline" size="lg">
          <InputField value={nickName} onChangeText={setNickName} />
        </Input>
      </VStack>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

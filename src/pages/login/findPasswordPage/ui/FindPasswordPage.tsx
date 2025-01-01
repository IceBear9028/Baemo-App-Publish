import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {FindPasswordUserForm} from '~/widgets/login/findPasswordUserForm';

export const FindPasswordPage = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <StyledHeaderContainer>
          <Heading color={'$primary500'} size={'2xl'}>
            휴대폰 인증
          </Heading>
          <Text color={'$textLight600'}>{'본인 확인을 위해\n휴대폰 번호를 인증해주세요.'}</Text>
        </StyledHeaderContainer>
        <StyledInputContainer>
          <FindPasswordUserForm />
        </StyledInputContainer>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: space-between;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledInputContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

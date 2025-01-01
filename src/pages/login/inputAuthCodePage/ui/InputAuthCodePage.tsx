import React from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {VerificationCodeForm} from 'widgets/login/verificationCodeForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootLoginStackParamList} from '~/shared/route';

interface InputAuthPageProps extends NativeStackScreenProps<RootLoginStackParamList, 'inputAuthPage'> {}

export const InputAuthCodePage = ({route}: InputAuthPageProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <StyledHeaderContainer>
          <Heading color={'$primary500'} size={'2xl'}>
            인증번호 입력
          </Heading>
          <Text color={'$textLight600'}>인증메시지의 6자리 번호를 입력해주세요.</Text>
        </StyledHeaderContainer>
        <StyledInputContainer>
          <VerificationCodeForm phone={route.params.phone} />
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

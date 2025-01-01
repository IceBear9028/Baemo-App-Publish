import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {FindPasswordResetForm} from '~/widgets/login/findPasswordResetForm';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootLoginStackParamList} from '~/shared/route';

interface FindPasswordResetPageProps extends NativeStackScreenProps<RootLoginStackParamList, 'findPasswordResetPage'> {}

export const FindPasswordResetPage = ({route}: FindPasswordResetPageProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <StyledHeaderContainer>
          <Heading color={'$primary500'} size={'2xl'}>
            비밀번호 변경
          </Heading>
          <Text color={'$textLight600'}>{'해당계정에 대해 \n새로운 비밀번호로 변경해주세요.'}</Text>
        </StyledHeaderContainer>
        <FindPasswordResetForm phone={route.params.phone} />
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

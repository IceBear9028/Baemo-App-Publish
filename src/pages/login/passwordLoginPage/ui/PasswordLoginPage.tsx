import React from 'react';
import styled from 'styled-components/native';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import {StandardLoginForm} from '~/widgets/login/standardLoginForm';
import {useLoginNavigate} from '~/shared/route';

const LoginTitle = () => {
  return (
    <TitleContainer>
      <Heading size={'4xl'} color={'$primary500'} bold={true}>
        BAEMO
      </Heading>
      <Text size={'xl'}>{'배드민턴의 모든 것'}</Text>
    </TitleContainer>
  );
};

export const PasswordLoginPage = () => {
  const {navigateSignup, navigateFindPassword} = useLoginNavigate();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.mainView}>
        <LoginTitle />
        <FormContainer>
          <StandardLoginForm />
          <StyledBottomButtonGroup>
            <StyledButtonContainer direction={'end'}>
              <Button size="sm" variant="link" onPress={navigateSignup}>
                <ButtonText>전화번호로 가입</ButtonText>
              </Button>
            </StyledButtonContainer>
            <StyledDivider />
            <StyledButtonContainer direction={'start'}>
              <Button size="sm" variant="link" onPress={navigateFindPassword}>
                <ButtonText>비밀번호 찾기</ButtonText>
              </Button>
            </StyledButtonContainer>
          </StyledBottomButtonGroup>
        </FormContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

const TitleContainer = styled.View`
  flex-direction: column;
  align-self: stretch;
  padding-bottom: 20px;
`;

const FormContainer = styled.View`
  flex-direction: column;
  gap: 40px;
  align-self: stretch;
`;

const StyledDivider = styled.View`
  width: 1px;
  height: 20px;
  background: #9ca3af;
`;

const StyledBottomButtonGroup = styled.View`
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;

const StyledButtonContainer = styled.View<{direction: 'start' | 'end'}>`
  flex: 1;
  justify-content: center;
  align-items: ${({direction}) => `flex-${direction}`};
`;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    gap: 20,
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

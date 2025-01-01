import React from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import {
  CheckPhoneInput,
  InitPasswordForm,
  InputBirthForm,
  InputGenderForm,
  InputNameForm,
  InputTermsOfServiceForm,
  RankDropdown,
  SubmitSignUpButton,
} from '~/widgets/login/userDetailInfoForm';
import {BlurView} from '@react-native-community/blur';

export const InputUserInfoPage = () => {
  return (
    <StyledContainer>
      <StyledScrollContainer>
        <StyledHeaderContainer>
          <Heading color={'$primary500'} size={'2xl'}>
            정보 입력하기
          </Heading>
          <Text color={'$textLight600'}>서비스 이용을 위해서 추가 정보를 입력해 주세요.</Text>
        </StyledHeaderContainer>
        <StyledInputContainer>
          <CheckPhoneInput />
          <InitPasswordForm />
          <InputNameForm />
          <RankDropdown />
          <InputGenderForm />
          {/*<InputBirthForm />*/}
        </StyledInputContainer>
      </StyledScrollContainer>
      <BlurView blurType="light" blurAmount={10} style={styles.bottomContainer}>
        <StyledBottomBody>
          <InputTermsOfServiceForm />
          <SubmitSignUpButton />
        </StyledBottomBody>
      </BlurView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingBottom: 40,
  },
});

const StyledContainer = styled.View`
  position: relative;
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  padding-top: 30px;
  padding-bottom: 42px;
`;

const StyledBottomBody = styled.View`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 32px;
  background: white;
  border-top-width: 1px;
  border-top-color: #dfdfdf;
  opacity: 0.8;
`;

const StyledContentsContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView`
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledInputContainer = styled.View`
  gap: 24px;
  padding-bottom: 320px;
`;

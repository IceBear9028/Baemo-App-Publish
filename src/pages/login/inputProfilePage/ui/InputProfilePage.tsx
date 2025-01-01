import React from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {useLoginForSignUp} from '../model/useLoginForSignUp.ts';
import {ProfileImagePicker} from '../ui/ProfileImagePicker.tsx';
import {InputProfileDescription} from '../ui/InputProfileDescription.tsx';
import {EditProfileSignUpButton} from '../ui/EditProfileSignUpButton.tsx';
import {InputProfileNickName} from '~/pages/login/inputProfilePage/ui/InputProfileNickName.tsx';
import {useKeyboardHeight} from '~/shared/utils';

export const InputProfilePage = () => {
  const keyboardHeight = useKeyboardHeight();
  console.log('keyboardHeight', keyboardHeight);
  useLoginForSignUp();
  return (
    <StyledContainer style={{marginBottom: keyboardHeight}}>
      <StyledContentsContainer>
        <StyledScrollContainer>
          <StyledHeaderContainer>
            <Heading color={'$primary500'} size={'2xl'}>
              내 프로필 작성하기
            </Heading>
            <Text color={'$textLight600'}>{'나를 잘 표현할 수 있는 프로필 정보를\n입력해 보세요!'}</Text>
          </StyledHeaderContainer>
          <StyledInputContainer>
            <ProfileImagePicker />
            <InputProfileDescription />
            <InputProfileNickName />
          </StyledInputContainer>
        </StyledScrollContainer>
      </StyledContentsContainer>
      <EditProfileSignUpButton />
    </StyledContainer>
  );
};

const StyledContainer = styled(Animated.View)`
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  padding-top: 30px;
  padding-bottom: 42px;
`;

const StyledContentsContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView`
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledInputContainer = styled.View`
  gap: 48px;
  padding-bottom: 40px;
`;

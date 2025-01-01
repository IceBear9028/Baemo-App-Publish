import React from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {StartBaemoButton} from '~/widgets/login/startBaemoButton';

export const SuccessSignUpPage = () => {
  return (
    <StyledContainer>
      <StyledContentsContainer>
        <StyledHeaderContainer>
          <Heading color={'$primary500'} size={'2xl'}>
            {'가입완료!\n환영합니다.'}
          </Heading>
          <Text color={'$textLight600'}>바로 배드민턴하러 나가볼까요?</Text>
        </StyledHeaderContainer>
      </StyledContentsContainer>
      <StartBaemoButton />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
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
  padding-right: 20px;
  padding-left: 20px;
`;

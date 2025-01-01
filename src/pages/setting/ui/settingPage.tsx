import React from 'react';
import styled from 'styled-components/native';
import {Heading} from '@gluestack-ui/themed';
import {CancelAccountCard} from '~/features/mySetting/cancelAccountCard';
import {LogoutSettingCard, TermsSettingCard} from '~/pages/setting/ui/settingCard.tsx';

export const SettingPage = () => {
  return (
    <StyledContainer>
      <StyledSection>
        <StyledTitleContainer>
          <Heading size={'sm'}>내 정보</Heading>
        </StyledTitleContainer>
        <LogoutSettingCard />
        <CancelAccountCard />
      </StyledSection>
      <StyledSection>
        <StyledTitleContainer>
          <Heading size={'sm'}>기타</Heading>
        </StyledTitleContainer>
        <TermsSettingCard />
      </StyledSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 36px;
`;

const StyledSection = styled.View``;

const StyledTitleContainer = styled.View`
  padding: 14px 20px;
`;

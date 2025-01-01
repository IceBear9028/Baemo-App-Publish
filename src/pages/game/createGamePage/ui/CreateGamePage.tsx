import React from 'react';
import styled from 'styled-components/native';
import {SpecifyTeamBoard} from '~/widgets/game/specifyTeamBoard';

export const CreateGamePage = () => {
  return (
    <StyledScrollContainer>
      <StyledContainer>
        <SpecifyTeamBoard />
      </StyledContainer>
    </StyledScrollContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 24px;
  padding-top: 32px;
  padding-bottom: 80px;
`;

const StyledScrollContainer = styled.ScrollView``;

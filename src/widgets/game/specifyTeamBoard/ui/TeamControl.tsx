import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {TeamTitle} from '~/widgets/game/specifyTeamBoard/ui/TeamTitle.tsx';
import {ATeamPlayerCard, BTeamPlayerCard} from '~/entities/game/teamPlayerCard';
import {FallbackTeam} from '~/widgets/game/specifyTeamBoard/ui/FallbackTeam.tsx';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';

export const TeamControl = () => {
  const {teams, deleteTeamPlayers} = useSpecifyTeamStore();
  const {aTeamPlayers, bTeamPlayers} = teams;
  const isExistPlayers = !![...aTeamPlayers, ...bTeamPlayers].length;
  return (
    <StyledSubContainer>
      <TeamTitle />
      <StyledTeamContainer>
        {isExistPlayers ? (
          <Fragment>
            <StyledTeamCardContainer>
              {aTeamPlayers.map((teamPlayer, id) => (
                <ATeamPlayerCard key={`${teamPlayer.userId}-${id}`} onDelete={() => deleteTeamPlayers('a', teamPlayer)} user={teamPlayer} />
              ))}
            </StyledTeamCardContainer>
            <StyledTeamCardContainer>
              {bTeamPlayers.map((teamPlayer, id) => (
                <BTeamPlayerCard key={`${teamPlayer.userId}-${id}`} onDelete={() => deleteTeamPlayers('b', teamPlayer)} user={teamPlayer} />
              ))}
            </StyledTeamCardContainer>
          </Fragment>
        ) : (
          <FallbackTeam />
        )}
      </StyledTeamContainer>
    </StyledSubContainer>
  );
};

const StyledSubContainer = styled.View`
  gap: 6px;
`;

const StyledTeamContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTeamCardContainer = styled.View`
  gap: 16px;
`;

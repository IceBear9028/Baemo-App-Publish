import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {useSpecifyTeamStore} from '~/features/game/specifyTeamStore';
import {ATeamPanelPlayerCard, BTeamPanelPlayerCard} from '~/entities/game/scoreBoardPlayerCard';
import {Game} from '~/shared/mapper/exercise';
import {PlayerProfileCard} from '~/shared/ui/game/playerProfileCard.tsx';

interface PlayerListProps extends Pick<Game, 'gameType'> {}

export const ATeamPlayerList = ({gameType}: PlayerListProps) => {
  const {teams, deleteTeamPlayers} = useSpecifyTeamStore();
  const {aTeamPlayers} = teams;
  const isTeamDefined = gameType === 1;
  const alignDirection = isTeamDefined ? 'horizon' : 'vertical';

  if (aTeamPlayers.length <= 0) {
    return <Fragment />;
  }

  return (
    <StyledContainer direction={'left'} align={alignDirection}>
      {aTeamPlayers.map(player => {
        if (isTeamDefined) {
          return <PlayerProfileCard user={player} team={'a'} />;
        }
        return <ATeamPanelPlayerCard player={player} onDeletePlayer={() => deleteTeamPlayers('a', player)} />;
      })}
    </StyledContainer>
  );
};

export const BTeamPlayerList = ({gameType}: PlayerListProps) => {
  const {teams, deleteTeamPlayers} = useSpecifyTeamStore();
  const {bTeamPlayers} = teams;
  const isTeamDefined = gameType === 1;
  const alignDirection = isTeamDefined ? 'horizon' : 'vertical';

  if (bTeamPlayers.length <= 0) {
    return <Fragment />;
  }

  return (
    <StyledContainer direction={'right'} align={alignDirection}>
      {bTeamPlayers.map(player => {
        if (isTeamDefined) {
          return <PlayerProfileCard user={player} team={'b'} />;
        }
        return <BTeamPanelPlayerCard player={player} onDeletePlayer={() => deleteTeamPlayers('b', player)} />;
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{direction: 'left' | 'right'; align: 'horizon' | 'vertical'}>`
  gap: 16px;
  padding: 12px 0 12px 0;
  flex-direction: ${({align}) => (align === 'horizon' ? 'row' : 'column')};
  justify-content: ${({direction}) => (direction === 'left' ? 'flex-start' : 'flex-end')};
`;

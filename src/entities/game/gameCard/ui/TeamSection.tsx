import React from 'react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';
import {GameTeam} from '~/shared/mapper/exercise';
import {CustomAvatar} from '~/shared/ui';
import {useMainNavigate} from '~/shared/route';

interface TeamProps {
  team: GameTeam;
}

export const TeamA = ({team}: TeamProps) => {
  const {navigateUserProfile} = useMainNavigate();
  return (
    <StyledContainer>
      <StyledTeamMemberGroup>
        {team.player.map((player, index) => (
          <StyledTeamMember key={`${player.name}-${index}`} direction={'left'}>
            <CustomAvatar
              size={'sm'}
              onPress={() => {
                player.userId && navigateUserProfile({userId: player.userId, chat: false});
              }}
              {...player}
            />
            <StyledMemberContent>
              <StyledMemberText direction={'left'}>
                <Text bold size={'sm'} color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'}>
                  {`${player.name}`}
                </Text>
              </StyledMemberText>
              <StyledMemberText direction={'left'}>
                <PlayerLevelBadge playerLevel={player.playerLevel} gender={player.gender} />
              </StyledMemberText>
            </StyledMemberContent>
          </StyledTeamMember>
        ))}
      </StyledTeamMemberGroup>
    </StyledContainer>
  );
};

export const TeamB = ({team}: TeamProps) => {
  const {navigateUserProfile} = useMainNavigate();
  return (
    <StyledContainer>
      <StyledTeamMemberGroup>
        {team.player.map((player, index) => (
          <StyledTeamMember key={`${player.name}-${index}`} direction={'right'}>
            <StyledMemberContent>
              <StyledMemberText direction={'right'}>
                <Text bold size={'sm'} color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'}>
                  {player.name}
                </Text>
              </StyledMemberText>
              <StyledMemberText direction={'right'}>
                <PlayerLevelBadge playerLevel={player.playerLevel} gender={player.gender} />
              </StyledMemberText>
            </StyledMemberContent>
            <CustomAvatar
              size={'sm'}
              onPress={() => {
                player.userId && navigateUserProfile({userId: player.userId, chat: false});
              }}
              {...player}
            />
          </StyledTeamMember>
        ))}
      </StyledTeamMemberGroup>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 8px;
`;

const StyledTeamMemberGroup = styled.View`
  align-items: stretch;
  gap: 16px;
`;

const StyledTeamMember = styled.View<{direction: 'left' | 'right'}>`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 6px;
  ${({direction}) => (direction === 'left' ? 'justify-content : flex-start;' : 'justify-content : flex-end;')}
`;

const StyledMemberContent = styled.View`
  align-items: stretch;
`;

const StyledMemberText = styled.View<{direction: 'left' | 'right'}>`
  flex: 1;
  flex-direction: row;
  ${({direction}) => (direction === 'left' ? 'justify-content : flex-start;' : 'justify-content : flex-end;')}
`;

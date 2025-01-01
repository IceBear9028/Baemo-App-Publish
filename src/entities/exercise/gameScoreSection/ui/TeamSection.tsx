import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import styled from 'styled-components/native';
import {GameTeam} from '~/shared/mapper/exercise';
import {CustomAvatar} from '~/shared/ui';

interface TeamProps {
  team: GameTeam;
}

export const TeamA = ({team}: TeamProps) => {
  const teamColor = useToken('colors', 'rose400');
  return (
    <StyledContainer>
      <StyledHeader teamColor={teamColor} direction={'left'}>
        <Text size={'md'} style={{color: teamColor}} bold>
          {team.name}
        </Text>
      </StyledHeader>
      <StyledTeamMemberGroup>
        {team.player.map((player, index) => (
          <StyledTeamMember key={`${player.name}-${index}`} direction={'left'}>
            <CustomAvatar size={'sm'} {...player} />
            <Text size={'sm'} numberOfLines={1} ellipsizeMode={'tail'}>
              {player.name}
            </Text>
          </StyledTeamMember>
        ))}
      </StyledTeamMemberGroup>
    </StyledContainer>
  );
};

export const TeamB = ({team}: TeamProps) => {
  const teamColor = useToken('colors', 'darkBlue400');
  return (
    <StyledContainer>
      <StyledHeader teamColor={teamColor} direction={'right'}>
        <Text size={'md'} style={{color: teamColor}} bold>
          {team.name}
        </Text>
      </StyledHeader>
      <StyledTeamMemberGroup>
        {team.player.map((player, index) => (
          <StyledTeamMember key={`${player.name}-${index}`} direction={'right'}>
            <Text size={'sm'} numberOfLines={1} ellipsizeMode={'tail'}>
              {player.name}
            </Text>
            <CustomAvatar size={'sm'} {...player} />
          </StyledTeamMember>
        ))}
      </StyledTeamMemberGroup>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 16px;
`;

const StyledHeader = styled.View<{teamColor: string; direction: 'left' | 'right'}>`
  flex: 1;
  flex-direction: row;
  padding-left: 11px;
  border-color: ${({teamColor}) => teamColor};
  ${({direction}) => (direction === 'left' ? 'border-left-width : 3px;' : 'border-right-width : 3px;')}
  ${({direction}) => (direction === 'left' ? 'justify-content : flex-start;' : 'justify-content : flex-end;')}
  ${({direction}) => (direction === 'left' ? 'padding-left : 11px;' : 'padding-right : 11px;')}
  ${({direction, teamColor}) => `border-${direction} : ${teamColor};`}
`;

const StyledTeamMemberGroup = styled.View`
  align-items: stretch;
  gap: 12px;
`;

const StyledTeamMember = styled.View<{direction: 'left' | 'right'}>`
  flex-direction: row;
  flex: 1;
  gap: 6px;
  align-items: center;
  ${({direction}) => (direction === 'left' ? 'justify-content : flex-start;' : 'justify-content : flex-end;')}
`;

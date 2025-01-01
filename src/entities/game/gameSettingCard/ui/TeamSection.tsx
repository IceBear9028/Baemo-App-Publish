import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import styled from 'styled-components/native';
import {GameTeam, GameType} from '~/shared/mapper/exercise';
import {CustomAvatar} from '~/shared/ui';
import {PlayerProfile} from '~/shared/mapper/userProfile';

interface TeamProps {
  type: keyof GameType;
  team: GameTeam;
  oppositionTeam: GameTeam;
}

export const TeamA = ({team, type, oppositionTeam}: TeamProps) => {
  const cautionColor = useToken('colors', 'rose400');
  const teamMembers = [team.player[0], team.player[1]];

  const TeamAPlayerCard = (player: PlayerProfile) => {
    return (
      <StyledTeamMember direction={'right'}>
        <StyledTextContainer>
          <Text bold size={'xs'} color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'} style={{textAlign: 'right'}}>
            {player.name}
          </Text>
        </StyledTextContainer>
        <CustomAvatar size={'xs'} name={player.name} profileImage={player.profileImage} />
      </StyledTeamMember>
    );
  };

  return (
    <StyledContainer>
      {teamMembers.map((player, index) =>
        player ? (
          <TeamAPlayerCard {...player} key={`${player.name}-${index}`} />
        ) : (
          <Text size={'xs'} bold style={{color: cautionColor}}>
            {`인원부족`}
          </Text>
        ),
      )}
    </StyledContainer>
  );
};

export const TeamB = ({team, type, oppositionTeam}: TeamProps) => {
  const cautionColor = useToken('colors', 'rose400');
  const teamMembers = [team.player[0], team.player[1]];

  const TeamBPlayerCard = (player: PlayerProfile) => {
    return (
      <StyledTeamMember key={`${player.name}-${player.userId}`} direction={'left'}>
        <CustomAvatar size={'xs'} name={player.name} profileImage={player.profileImage} />
        <StyledTextContainer>
          <Text bold size={'xs'} color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'}>
            {player.name}
          </Text>
        </StyledTextContainer>
      </StyledTeamMember>
    );
  };

  return (
    <StyledContainer>
      {teamMembers.map((player, index) =>
        player ? (
          <TeamBPlayerCard {...player} key={`${player.name}-${index}`} />
        ) : (
          <Text size={'xs'} bold style={{color: cautionColor}}>
            {`인원부족`}
          </Text>
        ),
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 8px;
`;

const StyledTeamMember = styled.View<{direction: 'left' | 'right'}>`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 6px;
  ${({direction}) => (direction === 'left' ? 'justify-content : flex-start;' : 'justify-content : flex-end;')}
`;

const StyledTextContainer = styled.View`
  width: 90%;
`;

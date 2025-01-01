import styled from 'styled-components/native';
import {PlayerProfileCard} from '~/shared/ui/game/playerProfileCard.tsx';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import AddTeamIcon from '~/shared/images/svg/button_addTeam.svg';
import {Alert} from 'react-native';

interface ApplyPlayerCardProps {
  user: PlayerProfile;
  isSpecifyTeam: boolean;
  onDelete: (user: PlayerProfile) => void;
  addTeamA: () => void;
  addTeamB: () => void;
}

export const ApplyPlayerCard = (props: ApplyPlayerCardProps) => {
  function pressATeam() {
    if (props.isSpecifyTeam) {
      props.addTeamA();
    } else {
      Alert.alert('팀 지정', '팀 지정 옵션을 활성화해야 합니다.', [{text: '확인'}]);
    }
  }
  function pressBTeam() {
    if (props.isSpecifyTeam) {
      props.addTeamB();
    } else {
      Alert.alert('팀 지정', '팀 지정 옵션을 활성화해야 합니다.', [{text: '확인'}]);
    }
  }
  return (
    <StyledContainer>
      <StyledButton onPress={pressATeam} isSpecify={props.isSpecifyTeam}>
        <AddTeamIcon />
      </StyledButton>
      <StyledProfileContainer>
        <PlayerProfileCard user={props.user} onDelete={props.onDelete} />
      </StyledProfileContainer>
      <StyledButton onPress={pressBTeam} isSpecify={props.isSpecifyTeam}>
        <AddTeamIcon />
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledProfileContainer = styled.View``;

const StyledButton = styled.TouchableOpacity<{isSpecify: boolean}>`
  opacity: ${({isSpecify}) => (isSpecify ? 1 : 0.5)};
`;

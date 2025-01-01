import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import {ExerciseGameMember, GameStatus} from '~/shared/mapper/exercise';
import {CustomAvatar, GameStatusBadge} from '~/shared/ui';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';

interface SelectPlayerCardProps {
  user: ExerciseGameMember;
  onSelect: (input: PlayerProfile) => void;
  isSelect?: boolean;
  memberStatus: keyof GameStatus;
}

export const SelectPlayerCard = ({user, onSelect, isSelect = false, memberStatus}: SelectPlayerCardProps) => {
  const [selectStatus, setSelectStatus] = useState<boolean>(isSelect);

  function pressEventHandler() {
    onSelect(user);
    setSelectStatus(() => true);
  }

  useEffect(() => {
    setSelectStatus(() => isSelect);
  }, [isSelect, selectStatus]);

  return (
    <StyledContainer>
      <StyledInfoContainer>
        <StyledAvatarContainer>
          <CustomAvatar {...user} />
          <StyledTextContainer>
            <StyledBadgeContainer>
              <Text bold={true}>{user.name}</Text>
              <PlayerLevelBadge {...user} />
            </StyledBadgeContainer>
            <StyledBadgeContainer>
              <GameStatusBadge status={memberStatus} />
            </StyledBadgeContainer>
          </StyledTextContainer>
        </StyledAvatarContainer>
        <Text size={'xs'}>{`총 게임 : ${user.matchCount}개`}</Text>
      </StyledInfoContainer>
      {selectStatus ? (
        <Button size={'xs'} variant={'outline'} action={'secondary'} onPress={pressEventHandler}>
          <ButtonText>취소</ButtonText>
        </Button>
      ) : (
        <Button size={'xs'} variant={'outline'} onPress={pressEventHandler}>
          <ButtonText>추가</ButtonText>
        </Button>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const StyledInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledAvatarContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const StyledTextContainer = styled.View`
  gap: 8px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

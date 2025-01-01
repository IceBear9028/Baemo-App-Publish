import {PlayerProfile} from '~/shared/mapper/userProfile';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import DeleteIcon from '~/shared/images/svg/delete_player.svg';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';
import {CustomAvatar} from '~/shared/ui';

interface PlayerProfileCardProps {
  user: PlayerProfile;
  onDelete?: (user: PlayerProfile) => void;
  team?: 'a' | 'b';
}

export const PlayerProfileCard = ({onDelete, team = 'a', user}: PlayerProfileCardProps) => {
  const isDelete = !!onDelete;
  return (
    <StyledContainer team={team} isDelete={isDelete}>
      <CustomAvatar size={'sm'} {...user} />
      <StyledContents team={team}>
        <StyledInfoContainer team={team}>
          <Text size={'sm'} bold={true} numberOfLines={1} ellipsizeMode={'tail'}>
            {user.name}
          </Text>
          {user.nickName && (
            <Text size={'sm'} numberOfLines={1} ellipsizeMode={'tail'}>
              {user.nickName}
            </Text>
          )}
          <PlayerLevelBadge {...user} />
        </StyledInfoContainer>
        {onDelete && (
          <DeleteButtonContainer onPress={() => onDelete(user)}>
            <DeleteIcon />
          </DeleteButtonContainer>
        )}
      </StyledContents>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{team: 'a' | 'b'; isDelete: boolean}>`
  flex-direction: ${({team}) => (team === 'a' ? 'row' : 'row-reverse')};
  gap: 6px;
  align-items: center;
  width: ${({isDelete}) => (isDelete ? '130px' : '100px')};
`;

const StyledContents = styled.View<{team: 'a' | 'b'}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({team}) => (team === 'a' ? 'flex-start' : 'flex-end')};
`;

const StyledInfoContainer = styled.View<{team: 'a' | 'b'}>`
  gap: 4px;
  width: 70px;
  justify-content: center;
  align-items: ${({team}) => (team === 'a' ? 'flex-start' : 'flex-end')};
`;

const DeleteButtonContainer = styled.Pressable``;

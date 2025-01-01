import {Fragment} from 'react';
import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {EditIcon, ExternalLinkIcon, Icon, Menu, MenuItem, MenuItemLabel, TrashIcon} from '@gluestack-ui/themed';
import {GameInfoSection} from '~/entities/game/gameSettingCard/ui/GameInfoSection.tsx';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';

interface GameMenuProps extends Game {
  onNavigateEdit: () => void;
  onDeleteGame: () => void;
  onRejectJudge: () => void;
}

export const GameMenu = ({gameOrder, gameType, courtNumber, onNavigateEdit, onDeleteGame, onRejectJudge, gameStatus}: GameMenuProps) => {
  const role = useExerciseRoleStore(store => store.role);
  switch (role) {
    case 'ADMIN':
      return (
        <Menu
          trigger={({...triggerProps}) => {
            return (
              <StyledButton {...triggerProps}>
                <GameInfoSection gameOrder={gameOrder} courtNumber={courtNumber} gameType={gameType} gameStatus={gameStatus} />
              </StyledButton>
            );
          }}>
          <MenuItem key="edit-info" textValue="edit-info" onPress={onNavigateEdit}>
            <Icon as={EditIcon} mr="$3" />
            <MenuItemLabel size="sm">게임 수정</MenuItemLabel>
          </MenuItem>
          <MenuItem key="reject-judge" textValue="del-eo" onPress={onRejectJudge}>
            <Icon as={ExternalLinkIcon} mr="$3" />
            <MenuItemLabel size="sm">심판 내보내기</MenuItemLabel>
          </MenuItem>
          <MenuItem key="del-game" textValue="del-game" onPress={onDeleteGame}>
            <Icon as={TrashIcon} mr="$3" color={'$error500'} />
            <MenuItemLabel size="sm" color={'$error500'}>
              게임 삭제
            </MenuItemLabel>
          </MenuItem>
        </Menu>
      );
    default:
      return <Fragment />;
  }
};

const StyledButton = styled.TouchableOpacity``;

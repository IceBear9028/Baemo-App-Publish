import {Fragment} from 'react';
import styled from 'styled-components/native';
import {ExerciseUserRole} from '~/shared/mapper/exercise';
import {EditIcon, Icon, ExternalLinkIcon, Menu, MenuItem, MenuItemLabel, TrashIcon} from '@gluestack-ui/themed';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';

interface GameMenuProps {
  role: ExerciseUserRole;
  onNavigateEdit: () => void;
  onDeleteGame: () => void;
  onRejectJudge: () => void;
}

export const GameMenu = ({role, onNavigateEdit, onDeleteGame, onRejectJudge}: GameMenuProps) => {
  switch (role) {
    case 'ADMIN':
      return (
        <Menu
          trigger={({...triggerProps}) => {
            return (
              <StyledButton {...triggerProps}>
                <MoreIcon />
              </StyledButton>
            );
          }}>
          <MenuItem key="edit-info" textValue="edit-info" onPress={onNavigateEdit}>
            <Icon as={EditIcon} mr="$3" />
            <MenuItemLabel size="sm">게임 수정</MenuItemLabel>
          </MenuItem>
          <MenuItem key="edit-info" textValue="del-eo" onPress={onRejectJudge}>
            <Icon as={ExternalLinkIcon} mr="$3" />
            <MenuItemLabel size="sm">심판 내보내기</MenuItemLabel>
          </MenuItem>
          <MenuItem key="edit-info" textValue="del-game" onPress={onDeleteGame}>
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

const StyledButton = styled.Pressable``;

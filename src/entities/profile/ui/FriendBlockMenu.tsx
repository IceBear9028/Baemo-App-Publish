import styled from 'styled-components/native';
import {AlertCircleIcon, Icon, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';
import HamburgerIcon from '~/shared/images/svg/more_vert.svg';
import {useFetchPostFriendBlock} from '~/entities/profile/model/useFetchPostFriendBlock.ts';
import {useFetchDeleteFriendBlock} from '~/entities/profile/model/useFetchDeleteFriendBlock.ts';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';

interface BlockProps {
  userId: number;
}
interface UnblockProps {
  relationId: number;
}

export const FriendBlockMenu = ({userId}: BlockProps) => {
  const {isPending, postFriendBlock} = useFetchPostFriendBlock();

  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <HamburgerIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="FriendBlock" textValue="FriendBlock" onPress={() => postFriendBlock(userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">차단하기</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

export const UnblockFriendMenu = ({relationId}: UnblockProps) => {
  const {isPending, deleteFriendBlock} = useFetchDeleteFriendBlock();
  console.log('relationId값', relationId);
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <HamburgerIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="FriendUnblock" textValue="FriendUnblock" onPress={() => deleteFriendBlock(relationId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">차단해제</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

export const UserProfileFriendBlock = ({userId}: BlockProps) => {
  const {isPending, postFriendBlock} = useFetchPostFriendBlock();

  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="FriendBlock" textValue="FriendBlock" onPress={() => postFriendBlock(userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">차단하기</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};
const StyledButton = styled.Pressable``;

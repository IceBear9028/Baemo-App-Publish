import styled from 'styled-components/native';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {Icon, CheckIcon, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';
import {useFetchAllReadNotification} from '../model/useFetchAllReadNotification.ts';

export const NotificationMenu = () => {
  const {allRaedNotification} = useFetchAllReadNotification();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="noti-all-read" textValue="noti-all-read-" onPress={allRaedNotification}>
        <Icon as={CheckIcon} mr="$3" />
        <MenuItemLabel size="sm">알림 모두 읽기</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable``;

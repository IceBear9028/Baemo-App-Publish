import styled from 'styled-components/native';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {AlertCircleIcon, ExternalLinkIcon, Icon, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';
import {DetailGroupMenuProps} from '~/widgets/groups/DetailGroupMenu/ui/DetailGroupMenu.tsx';
import {useMainNavigate} from '~/shared/route';
import {useFetchExitGroup} from '~/widgets/groups/DetailGroupMenu/model/useFetchExitGroup.ts';

export const MemberMenu = ({groupsId}: DetailGroupMenuProps) => {
  const {navigateReportGroup} = useMainNavigate();
  const {exitGroup} = useFetchExitGroup();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="del-comment" textValue="del-comment" onPress={() => navigateReportGroup(groupsId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">신고하기</MenuItemLabel>
      </MenuItem>
      <MenuItem key="exit-club" textValue="edit-info" onPress={() => exitGroup(groupsId)}>
        <Icon as={ExternalLinkIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          모임 나가기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable``;

import styled from 'styled-components/native';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {AlertCircleIcon, Icon, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {DetailGroupMenuProps} from '../ui/DetailGroupMenu.tsx';

export const NonMemberMenu = ({groupsId}: DetailGroupMenuProps) => {
  const {navigateReportGroup} = useMainNavigate();
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
        <Icon as={AlertCircleIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          신고하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

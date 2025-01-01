import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {GroupArticleMenuProps} from '../ui/GroupArticleMenu.tsx';
import {AlertCircleIcon, Icon, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';

export const ReaderMenu = ({groupsId, id}: GroupArticleMenuProps) => {
  const {navigateReportArticle} = useMainNavigate();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="reader-post-report" textValue="Community" onPress={() => navigateReportArticle(id)}>
        <Icon as={AlertCircleIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          신고하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.TouchableOpacity``;

import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import {Icon, Menu, MenuItem, MenuItemLabel, AlertCircleIcon} from '@gluestack-ui/themed';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {Comment} from '~/shared/mapper/community';

interface CommentReaderMenuProps extends Pick<Comment, 'commentUser'> {}

export const CommentReaderMenu = ({commentUser}: CommentReaderMenuProps) => {
  const {navigateReportUser} = useMainNavigate();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="del-comment" textValue="del-comment" onPress={() => navigateReportUser(commentUser.userId)}>
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

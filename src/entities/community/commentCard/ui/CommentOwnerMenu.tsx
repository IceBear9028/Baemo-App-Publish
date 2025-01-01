import styled from 'styled-components/native';
import {Icon, Menu, MenuItem, MenuItemLabel, MessageCircleIcon, TrashIcon} from '@gluestack-ui/themed';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {CommentCardProps} from '~/entities/community/commentCard/ui/CommentCard.tsx';
import {useMainNavigate} from '~/shared/route';

interface CommentOwnerMenu extends Pick<CommentCardProps, 'onDelComment' | 'onEditComment' | 'commentUser'> {}

export const CommentOwnerMenu = ({onEditComment, onDelComment, commentUser}: CommentOwnerMenu) => {
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
      <MenuItem key="edit-comment" textValue="edit-comment" onPress={onEditComment}>
        <Icon as={MessageCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">댓글 수정</MenuItemLabel>
      </MenuItem>
      <MenuItem key="del-comment" textValue="del-comment" onPress={onDelComment}>
        <Icon as={TrashIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          댓글 삭제하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {GroupArticleMenuProps} from '../ui/GroupArticleMenu.tsx';
import {EditIcon, Icon, Menu, MenuItem, MenuItemLabel, TrashIcon} from '@gluestack-ui/themed';
import {useFetchDeleteGroupArticle} from '~/widgets/groups/GroupArticleMenu/model/useFetchDeleteGroupArticle.ts';

export const AuthorMenu = ({id, groupsId}: GroupArticleMenuProps) => {
  const {deleteGroup} = useFetchDeleteGroupArticle();
  const {navigateGroupWriteArticlePage} = useMainNavigate();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem
        key="edit-info"
        textValue="edit-info"
        onPress={() => {
          navigateGroupWriteArticlePage(groupsId, id);
        }}>
        <Icon as={EditIcon} mr="$3" />
        <MenuItemLabel size="sm">게시글 수정</MenuItemLabel>
      </MenuItem>
      <MenuItem key="del-article" textValue="del-article" onPress={() => deleteGroup(groupsId, id)}>
        <Icon as={TrashIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          글 삭제하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

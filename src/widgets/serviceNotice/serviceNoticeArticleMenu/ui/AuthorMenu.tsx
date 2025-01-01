import styled from 'styled-components/native';
import {useMainNavigate} from '~/shared/route';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {ServiceNoticeArticleMenuProps} from './ServiceNoticeArticleMenu.tsx';
import {useFetchDeleteNoticeArticle} from '../model/useFetchDeleteNoticeArticle.ts';
import {EditIcon, Icon, Menu, MenuItem, MenuItemLabel, TrashIcon} from '@gluestack-ui/themed';

export const AuthorMenu = ({id}: ServiceNoticeArticleMenuProps) => {
  const {deleteServiceNotice} = useFetchDeleteNoticeArticle();
  const {navigateServiceNoticeArticleWritePage} = useMainNavigate();

  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="edit-info" textValue="edit-info" onPress={() => navigateServiceNoticeArticleWritePage(id)}>
        <Icon as={EditIcon} mr="$3" />
        <MenuItemLabel size="sm">게시글 수정</MenuItemLabel>
      </MenuItem>
      <MenuItem key="del-article" textValue="del-article" onPress={() => deleteServiceNotice(id)}>
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

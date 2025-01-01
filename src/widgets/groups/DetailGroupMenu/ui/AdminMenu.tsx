import {Alert} from 'react-native';
import styled from 'styled-components/native';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {Icon, EditIcon, TrashIcon, Menu, MenuItem, MenuItemLabel, AlertCircleIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {useFetchDeleteGroup} from '../model/useFetchDeleteGroup.ts';
import {DetailGroupMenuProps} from '../ui/DetailGroupMenu.tsx';
import {useQueryClient} from '@tanstack/react-query';
import {groupHomeInfoQueryKey} from '~/features/groups/detailGroupsIntroduction';
import {GroupsIntro} from '~/shared/mapper/groups';

export const AdminMenu = ({groupsId}: DetailGroupMenuProps) => {
  const queryClient = useQueryClient();
  const {isPendingDel, deleteGroup} = useFetchDeleteGroup();
  const {navigateEditGroup, navigateReportGroup} = useMainNavigate();
  const groupIntro = queryClient.getQueryData<GroupsIntro>([...groupHomeInfoQueryKey, groupsId]);

  function fetchDeleteGroup() {
    Alert.alert('모임을 정말로 삭제할까요?', '삭제 시 취소할 수 없습니다.', [
      {text: '취소', style: 'cancel'},
      {text: '삭제', style: 'destructive', onPress: () => deleteGroup(groupsId)},
    ]);
  }

  function editGroup() {
    if (groupIntro) {
      navigateEditGroup({groupsId, groupIntro});
    } else {
      Alert.alert('에러발생', '예상치 못한 문제가 발생했습니다.', [{text: '확인'}]);
    }
  }
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="edit-info" textValue="edit-info" onPress={editGroup}>
        <Icon as={EditIcon} mr="$3" />
        <MenuItemLabel size="sm">모임정보 수정</MenuItemLabel>
      </MenuItem>
      <MenuItem key="del-comment" textValue="del-comment" onPress={() => navigateReportGroup(groupsId)}>
        <Icon as={AlertCircleIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          신고하기
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="exit-club" textValue="edit-info" onPress={fetchDeleteGroup}>
        <Icon as={TrashIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          모임 삭제하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

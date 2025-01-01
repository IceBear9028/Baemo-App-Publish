import {Fragment, useEffect} from 'react';
import styled from 'styled-components/native';
import {AlertCircleIcon, Icon, Menu, MenuItem, MenuItemLabel, RepeatIcon, TrashIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {useSelectMemberRole} from '../model/useSelectMemberRole.ts';
import {useFetchChangeMemberRole} from '../model/useFetchChangeMemberRole.ts';
import {useBottomSheetController} from '~/shared/bottomSheet';
import {SelectGroupMemberRoleBottomSheet} from '~/entities/groups/selectGroupMemberRoleBottomSheet';
import {useFetchKickMember} from '~/features/groups/groupMemberCard/model/useFetchKickMember.ts';
import {GroupMemberMenuProps} from '../ui/GroupMemberMenu.tsx';

// interface MenuProps extends GroupMember, Pick<Groups, 'groupsId'> {}

export const GroupAdminMenu = (props: GroupMemberMenuProps) => {
  const {groupsId, userProfile} = props;
  const {navigateReportUser} = useMainNavigate();
  const {selectRole, setSelectRole} = useSelectMemberRole();
  const {isPendingKick, kickMember} = useFetchKickMember();
  const {isPendingRole, changeMemberRole} = useFetchChangeMemberRole();
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();

  useEffect(() => {
    if (selectRole) {
      changeMemberRole(groupsId, userProfile.userId, selectRole);
    }
  }, [selectRole]);

  return (
    <Fragment>
      <Menu
        trigger={({...triggerProps}) => {
          return (
            <StyledButton {...triggerProps}>
              <MoreIcon />
            </StyledButton>
          );
        }}>
        <MenuItem key="report-comment" textValue="report-comment" onPress={() => navigateReportUser(userProfile.userId)}>
          <Icon as={AlertCircleIcon} mr="$3" />
          <MenuItemLabel size="sm">신고하기</MenuItemLabel>
        </MenuItem>
        <MenuItem key="change-role" textValue="change-role" onPress={openBottomSheet}>
          <Icon as={RepeatIcon} mr="$3" />
          <MenuItemLabel size="sm">권한 변경하기</MenuItemLabel>
        </MenuItem>
        <MenuItem key="reject-member" textValue="reject-member" onPress={() => kickMember(groupsId, userProfile.userId)}>
          <Icon as={TrashIcon} mr="$3" color={'$error500'} />
          <MenuItemLabel size="sm" color={'$error500'}>
            인원 방출하기
          </MenuItemLabel>
        </MenuItem>
      </Menu>
      <SelectGroupMemberRoleBottomSheet
        ref={ref}
        userRole={props.memberStatus}
        onSelectRole={setSelectRole}
        closeBottomSheet={closeBottomSheet}
      />
    </Fragment>
  );
};

export const GroupManagerMenu = (props: GroupMemberMenuProps) => {
  const {groupsId, userProfile} = props;
  const {navigateReportUser} = useMainNavigate();
  const {isPendingKick, kickMember} = useFetchKickMember();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="report-comment" textValue="report-comment" onPress={() => navigateReportUser(userProfile.userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">신고하기</MenuItemLabel>
      </MenuItem>
      {props.memberStatus === 'MEMBER' && (
        <MenuItem key="reject-member" textValue="reject-member" onPress={() => kickMember(groupsId, userProfile.userId)}>
          <Icon as={TrashIcon} mr="$3" color={'$error500'} />
          <MenuItemLabel size="sm" color={'$error500'}>
            인원 방출하기
          </MenuItemLabel>
        </MenuItem>
      )}
    </Menu>
  );
};

export const GroupDefaultMemberMenu = (props: GroupMemberMenuProps) => {
  const {userProfile} = props;
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
      <MenuItem key="report-comment" textValue="report-comment" onPress={() => navigateReportUser(userProfile.userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">신고하기</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

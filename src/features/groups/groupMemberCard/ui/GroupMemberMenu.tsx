import {Fragment} from 'react';
import {useMyProfileStore} from '~/shared/authentication';
import {GroupMember, GroupRole, Groups} from '~/shared/mapper/groups';
import {GroupAdminMenu, GroupDefaultMemberMenu, GroupManagerMenu} from '../ui/MemberMenu.tsx';

export interface GroupMemberMenuProps extends Omit<GroupMember, 'playerLevel'>, Pick<Groups, 'groupsId'> {
  myRole: keyof GroupRole;
}

export const GroupMemberMenu = (props: GroupMemberMenuProps) => {
  const {userId: myUserId} = useMyProfileStore();

  if (myUserId === props.userProfile.userId) {
    return <Fragment />;
  }

  switch (props.myRole) {
    case 'ADMIN':
      return <GroupAdminMenu {...props} />;
    case 'MANAGER':
      return <GroupManagerMenu {...props} />;
    default:
      return <GroupDefaultMemberMenu {...props} />;
  }
};

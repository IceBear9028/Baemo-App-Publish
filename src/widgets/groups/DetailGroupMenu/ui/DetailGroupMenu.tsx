import {Groups} from '~/shared/mapper/groups';
import {AdminMenu} from './AdminMenu.tsx';
import {MemberMenu} from './MemberMenu.tsx';
import {ManagerMenu} from './ManagerMenu.tsx';
import {NonMemberMenu} from './NonMemberMenu.tsx';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';

export interface DetailGroupMenuProps extends Pick<Groups, 'groupsId'> {}

export const DetailGroupMenu = (group: DetailGroupMenuProps) => {
  const {role} = useGroupRoleStore();
  switch (role) {
    case 'ADMIN':
      return <AdminMenu {...group} />;
    case 'MANAGER':
      return <ManagerMenu {...group} />;
    case 'MEMBER':
      return <MemberMenu {...group} />;
    default:
      return <NonMemberMenu {...group} />;
  }
};

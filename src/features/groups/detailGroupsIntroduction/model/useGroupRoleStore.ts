import {create} from 'zustand';
import {GroupRoleKeys} from '~/shared/mapper/groups';

interface GroupRoleStoreType {
  role: GroupRoleKeys;
  loadRole: (role: GroupRoleKeys) => void;
  resetRole: () => void;
}

const INIT_ROLE: GroupRoleKeys = 'NON_MEMBER';

/** ###useGroupRoleStore()
 * #### 용도
 * - 모임 페이지 접속 시, 접속한 유저의 권한 저장 & 확인을 위한 용도
 */
export const useGroupRoleStore = create<GroupRoleStoreType>((set, get) => ({
  role: INIT_ROLE,
  loadRole: updateRole => set(prev => ({...prev, role: updateRole})),
  resetRole: () => set(prev => ({...prev, role: INIT_ROLE})),
}));

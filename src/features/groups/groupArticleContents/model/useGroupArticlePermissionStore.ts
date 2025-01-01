import {create} from 'zustand';
import {DetailArticlePermission} from '~/shared/mapper/community';

interface GroupArticlePermission {
  /** 현재 상세보기 글을 작성한 유저의 id
   */
  userId: number;
  permission: keyof DetailArticlePermission;
  setPermission: (input: keyof DetailArticlePermission) => void;
  resetPermission: () => void;
  setUserId: (input: number) => void;
  resetUserId: () => void;
}
const INIT_USERID = NaN;
const INIT_PERMISSION: keyof DetailArticlePermission = 'READER';

/** ### useGroupArticlePermissionStore
 * #### 사용용도
 * - 상세글 접속 시, 글 작성자 권한을 저장하는 store
 * - 권한을 이용해서 페이지 처리
 */
export const useGroupArticlePermissionStore = create<GroupArticlePermission>((set, get) => ({
  userId: INIT_USERID,
  permission: INIT_PERMISSION,
  setPermission: per => set(prev => ({...prev, permission: per})),
  resetPermission: () => set(prev => ({...prev, permission: INIT_PERMISSION})),
  setUserId: id => set(prev => ({...prev, userId: id})),
  resetUserId: () => set(prev => ({...prev, userId: INIT_USERID})),
}));

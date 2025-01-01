import {create} from 'zustand';
import {ExerciseIntro, ExerciseMyRule} from '~/shared/mapper/exercise/lib/exerciseIntro.ts';
import {ExerciseStatus, ExerciseType} from '~/shared/mapper/exercise';

interface ExerciseRoleStoreType {
  role: keyof ExerciseMyRule;
  status: keyof ExerciseStatus;
  type: keyof ExerciseType;
  groupRole: ExerciseIntro['groupsRole'];
  exerciseId: number;
  loadRole: (
    exerciseId: number,
    role: keyof ExerciseMyRule,
    groupRole: ExerciseIntro['groupsRole'],
    status: keyof ExerciseStatus,
    type: keyof ExerciseType,
  ) => void;
  resetRole: () => void;
}

const INIT_ROLE: keyof ExerciseMyRule = 'PARTICIPANT';
const INIT_STATUS: keyof ExerciseStatus = 'COMPLETE';
const INIT_TYPE: keyof ExerciseType = 'IMPROMPTU';
const INIT_EXERCISE_ID: number = NaN;
const INIT_GROUP_ROLE: ExerciseIntro['groupsRole'] = null;

/** ### useExerciseRoleStore()
 * #### 용도
 * - 운동 페이지 접속 시, 접속한 유저의 권한 업데이트 & 확인
 */
export const useExerciseRoleStore = create<ExerciseRoleStoreType>((set, get) => ({
  role: INIT_ROLE,
  status: INIT_STATUS,
  type: INIT_TYPE,
  exerciseId: INIT_EXERCISE_ID,
  groupRole: INIT_GROUP_ROLE,
  loadRole: (exerciseId, updateRole, updateGroupRole, updateStatus, updateType) =>
    set(prev => ({...prev, exerciseId: exerciseId, role: updateRole, status: updateStatus, type: updateType, groupRole: updateGroupRole})),
  resetRole: () => set(prev => ({...prev, role: INIT_ROLE, status: INIT_STATUS})),
}));

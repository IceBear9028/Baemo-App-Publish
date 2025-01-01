import {useMainNavigate} from './useMainNavigate';

/**
 * Notification 에서 DeepLink 에 필요한 정보를 가공하여 페이지 이동
 */
export function useCreateRouteParams() {
  const {navigateDetailExercise, navigateDetailGroup} = useMainNavigate();

  async function navigateForDetailExerciseParams(exerciseId: number) {
    navigateDetailExercise(exerciseId);
  }

  async function navigateForDetailGroupsParams(groupsId: number) {
    navigateDetailGroup(groupsId);
  }

  return {
    navigateForDetailExerciseParams,
    navigateForDetailGroupsParams,
  };
}

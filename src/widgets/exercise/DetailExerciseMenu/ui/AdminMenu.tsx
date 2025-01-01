import {Alert} from 'react-native';
import {Fragment, useEffect} from 'react';
import {useMainNavigate} from '~/shared/route';
import styled from 'styled-components/native';
import {useQueryClient} from '@tanstack/react-query';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {useBottomSheetController} from '~/shared/bottomSheet';
import {useChangeProfile} from '../model/useChangeProfile.ts';
import {Exercise, ExerciseIntro} from '~/shared/mapper/exercise';
import {useFetchDeleteExercise} from '../model/useFetchDeleteExercise.ts';
import {exerciseIntroQueryKey} from '~/features/exercise/detailExerciseIntroduction';
import {ChangeExerciseStatusBottomSheet} from '~/entities/exercise/changeExerciseStatusBottomSheet';
import {EditIcon, ExternalLinkIcon, Icon, Menu, MenuItem, MenuItemLabel, PaperclipIcon, RepeatIcon, TrashIcon} from '@gluestack-ui/themed';
import {useSelectExerciseStatus} from '~/widgets/exercise/DetailExerciseMenu/model/useSelectExerciseStatus.ts';
import {useFetchChangeExerciseStatus} from '~/widgets/exercise/DetailExerciseMenu/model/useFetchChangeExerciseStatus.ts';
import {useFetchExitExercise} from '~/widgets/exercise/DetailExerciseMenu/model/useFetchExitExercise.ts';

interface AdminMenuProps extends Pick<Exercise, 'exerciseId' | 'exerciseStatus'> {}

export const AdminMenu = ({exerciseId, exerciseStatus}: AdminMenuProps) => {
  const queryClient = useQueryClient();
  const {exitExercise} = useFetchExitExercise();
  const {deleteExercise} = useFetchDeleteExercise();
  const {selectProfileImage} = useChangeProfile(exerciseId);
  const {changeExerciseStatus} = useFetchChangeExerciseStatus();
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  const {navigateEditGroupExercise, navigateEditThunderExercise} = useMainNavigate();
  const {selectExerciseStatus, setExerciseStatus, isOpen} = useSelectExerciseStatus(exerciseStatus);
  const exerciseIntro = queryClient.getQueryData<ExerciseIntro>([...exerciseIntroQueryKey, exerciseId]);

  useEffect(() => {
    console.log('현재 상태', selectExerciseStatus);
    console.log('초기 상태', exerciseStatus);
    if (selectExerciseStatus !== exerciseStatus) {
      changeExerciseStatus(exerciseId, selectExerciseStatus);
    }
  }, [isOpen]);

  function editExercise() {
    if (['PROGRESS', 'COMPLETE'].includes(exerciseStatus)) {
      Alert.alert('운동편집', '운동이 시작되거나 완료되면 편집할 수 없습니다.', [{text: '완료'}]);
    } else {
      // 모임운동일 경우에 대한 페이지 이동 처리
      if (exerciseIntro) {
        if (exerciseIntro.groupsId) {
          navigateEditGroupExercise(exerciseIntro);
        } else {
          navigateEditThunderExercise(exerciseIntro);
        }
      }
    }
  }

  function delExercise() {
    if (['PROGRESS', 'COMPLETE'].includes(exerciseStatus)) {
      Alert.alert('운동편집', '운동이 시작되거나 완료되면 삭제할 수 없습니다.', [{text: '완료'}]);
    } else {
      if (exerciseId) {
        deleteExercise(exerciseId);
      }
    }
  }

  function changeProfile() {
    if (['PROGRESS', 'COMPLETE'].includes(exerciseStatus)) {
      Alert.alert('운동편집', '운동이 시작되거나 완료되면 편집할 수 없습니다.', [{text: '완료'}]);
    } else {
      if (exerciseIntro && exerciseIntro.exerciseId) {
        selectProfileImage();
      } else {
        Alert.alert('프로필 편집', '문제가 발생했습니다.', [{text: '완료'}]);
      }
    }
  }

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
        <MenuItem key="edit-info" textValue="edit-info" onPress={editExercise}>
          <Icon as={EditIcon} mr="$3" />
          <MenuItemLabel size="sm">운동정보 수정</MenuItemLabel>
        </MenuItem>
        <MenuItem key="edit-profile" textValue="edit-profile" onPress={changeProfile}>
          <Icon as={PaperclipIcon} mr="$3" />
          <MenuItemLabel size="sm">프로필 사진 변경</MenuItemLabel>
        </MenuItem>
        <MenuItem key="status-edit" textValue="status-edit" onPress={openBottomSheet}>
          <Icon as={RepeatIcon} mr="$3" />
          <MenuItemLabel size="sm">운동상태 변경</MenuItemLabel>
        </MenuItem>
        <MenuItem key="exercise-exit" textValue="exercise-exit" onPress={() => exitExercise(exerciseId, exerciseStatus)}>
          <Icon as={ExternalLinkIcon} mr="$3" />
          <MenuItemLabel size="sm">운동 나가기</MenuItemLabel>
        </MenuItem>
        <MenuItem key="delete-exercise" textValue="delete-exercise" onPress={delExercise}>
          <Icon as={TrashIcon} mr="$3" color={'$error500'} />
          <MenuItemLabel size="sm" color={'$error500'}>
            운동 삭제하기
          </MenuItemLabel>
        </MenuItem>
      </Menu>
      <ChangeExerciseStatusBottomSheet
        ref={ref}
        prevStatus={exerciseStatus}
        updateStatus={selectExerciseStatus}
        onSelectRole={setExerciseStatus}
        closeBottomSheet={closeBottomSheet}
      />
    </Fragment>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

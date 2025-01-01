import {Fragment} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {UserProfile} from '~/shared/mapper/userProfile';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {ExerciseStatus} from '~/shared/mapper/exercise';
import {useMainNavigate} from '~/shared/route';
import {Menu, Icon, MenuItem, MenuItemLabel, SlashIcon, AlertCircleIcon, RepeatIcon} from '@gluestack-ui/themed';
import {useFetchChangeExerciseMemberRole} from '~/entities/exercise/exerciseMemberCard/model/useFetchChangeExerciseMemberRole.ts';
import {useFetchEjectExerciseMember} from '../model/useFetchEjectExerciseMember.ts';
import {useExerciseRoleStore} from '~/features/exercise/detailExerciseIntroduction';
import {ExerciseMemberRole} from '~/shared/mapper/exercise/lib/exerciseMember.ts';

interface ExerciseMenuProps {
  exerciseId: number;
  targetUser: UserProfile;
  targetUserRole: keyof ExerciseMemberRole;
  exerciseStatus: keyof ExerciseStatus;
}

export const ExerciseMenu = (props: ExerciseMenuProps) => {
  const {role: myRole} = useExerciseRoleStore();
  switch (myRole) {
    case 'ADMIN':
      return <AdminExerciseMenu {...props} />;
    case 'PARTICIPANT':
      return <DefaultMemberMenu {...props} />;
    default:
      return <Fragment />;
  }
};

const AdminExerciseMenu = (props: ExerciseMenuProps) => {
  const {exerciseId, targetUserRole, targetUser} = props;
  const {navigateReportUser} = useMainNavigate();
  const {ejectMember} = useFetchEjectExerciseMember();
  const {changeMemberRole} = useFetchChangeExerciseMemberRole();
  function ejectUser() {
    if (['PROGRESS', 'COMPLETE'].includes(props.exerciseStatus)) {
      Alert.alert('인원방출', '운동이 시작되거나 완료되면 방출할 수 없습니다.', [{text: '완료'}]);
    } else {
      ejectMember(exerciseId, targetUser.userId);
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
      <MenuItem key="report-comment" textValue="report-comment" onPress={() => navigateReportUser(props.targetUser.userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">신고하기</MenuItemLabel>
      </MenuItem>
      <MenuItem key="change-role" textValue="change-role" onPress={() => changeMemberRole(exerciseId, targetUser.userId, targetUserRole)}>
        <Icon as={RepeatIcon} mr="$3" />
        <MenuItemLabel size="sm">권한 변경하기</MenuItemLabel>
      </MenuItem>
      <MenuItem key="edit-info" textValue="edit-info" onPress={ejectUser}>
        <Icon as={SlashIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          인원 방출하기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const DefaultMemberMenu = (props: ExerciseMenuProps) => {
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
      <MenuItem key="report-comment" textValue="report-comment" onPress={() => navigateReportUser(props.targetUser.userId)}>
        <Icon as={AlertCircleIcon} mr="$3" />
        <MenuItemLabel size="sm">신고하기</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable`
  padding: 4px 0 4px 4px;
`;

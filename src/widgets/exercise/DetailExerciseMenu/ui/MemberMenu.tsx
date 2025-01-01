import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';
import {useFetchExitExercise} from '../model/useFetchExitExercise.ts';
import {Icon, Menu, MenuItem, MenuItemLabel, ExternalLinkIcon} from '@gluestack-ui/themed';

interface MemberMenuProps extends Pick<Exercise, 'exerciseId' | 'exerciseStatus'> {}

export const MemberMenu = ({exerciseId, exerciseStatus}: MemberMenuProps) => {
  const {exitExercise} = useFetchExitExercise();
  return (
    <Menu
      trigger={({...triggerProps}) => {
        return (
          <StyledButton {...triggerProps}>
            <MoreIcon />
          </StyledButton>
        );
      }}>
      <MenuItem key="exercise-exit" textValue="exercise-exit" onPress={() => exitExercise(exerciseId, exerciseStatus)}>
        <Icon as={ExternalLinkIcon} mr="$3" color={'$error500'} />
        <MenuItemLabel size="sm" color={'$error500'}>
          운동 나가기
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

const StyledButton = styled.Pressable``;

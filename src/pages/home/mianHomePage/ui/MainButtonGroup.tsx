import styled from 'styled-components/native';
import FindThunderIcon from '~/shared/images/svg/mainbtn_find_thunder.svg';
import CreateGroupIcon from '~/shared/images/svg/mainbtn_create_group.svg';
import BadmintonUserIcon from '~/shared/images/svg/mainbtn_find_exercise.svg';
import FindShortcutExerciseIconIcon from '~/shared/images/svg/mainbtn_find_group.svg';
import {useToken} from '@gluestack-style/react';
import {AddIcon, FabIcon, Text} from '@gluestack-ui/themed';
import {useBottomSheetController} from '~/shared/bottomSheet';
import {Fragment} from 'react';
import {CreateGroupBottomSheet} from '~/pages/home/mianHomePage/ui/CreateGroupBottomSheet.tsx';
import {FabButton} from '~/shared/ui';

interface MainButtonProps {
  onPress: () => void;
}

const FindRegionExerciseButton = ({onPress}: MainButtonProps) => {
  const backgroundColorToken = useToken('colors', 'primary100');
  return (
    <StyledCommonButton onPress={onPress} background={backgroundColorToken}>
      <Text size={'md'} bold={true} color={'$textLight950'}>
        지역별 {'\n'}운동 찾기
      </Text>
      <BadmintonUserIcon style={{position: 'absolute', right: -2, bottom: 0}} />
    </StyledCommonButton>
  );
};

const FindShortcutExerciseButton = ({onPress}: MainButtonProps) => {
  const backgroundColorToken = useToken('colors', 'primary50');
  return (
    <StyledCommonButton onPress={onPress} background={backgroundColorToken}>
      <Text size={'md'} bold={true} color={'$textLight950'}>
        내 주변 {'\n'}운동 찾기
      </Text>
      <FindShortcutExerciseIconIcon style={{position: 'absolute', right: -4, bottom: -12}} />
    </StyledCommonButton>
  );
};

const CreateGroupButton = ({onPress}: MainButtonProps) => {
  const backgroundColorToken = useToken('colors', 'cyan100');
  return (
    <StyledCommonButton onPress={onPress} background={backgroundColorToken}>
      <Text size={'md'} bold={true} color={'$textLight950'}>
        모임 / 운동 {'\n'}만들기
      </Text>
      <CreateGroupIcon style={{position: 'absolute', right: -6, top: 26}} />
    </StyledCommonButton>
  );
};

const FindThunderButton = ({onPress}: MainButtonProps) => {
  const backgroundColorToken = useToken('colors', 'orange100');
  return (
    <StyledCommonButton onPress={onPress} background={backgroundColorToken}>
      <Text size={'md'} bold={true} color={'$textLight950'}>
        번개운동 {'\n'}찾기
      </Text>
      <FindThunderIcon style={{position: 'absolute', right: -3, top: 30}} />
    </StyledCommonButton>
  );
};

export const MainButtonGroup = () => {
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  return (
    <Fragment>
      <FabButtonContainer>
        <FabButton icon={<FabIcon as={AddIcon} />} title={'활동'} onPress={openBottomSheet} />
      </FabButtonContainer>
      <CreateGroupBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} />
    </Fragment>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  gap: 16px;
  padding: 0 20px 0 20px;
`;

const StyledVerticalGroup = styled.View`
  flex-direction: column;
  gap: 12px;
  width: 47.5%;
`;

const StyledCommonButton = styled.TouchableOpacity<{background: string}>`
  position: relative;
  height: 90px;
  padding: 10px 14px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 4px;
  align-self: stretch;
  flex-wrap: wrap;
  width: 100%;
  background: ${({background}) => background};
  overflow: hidden;
  border-radius: 12px;
`;

const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

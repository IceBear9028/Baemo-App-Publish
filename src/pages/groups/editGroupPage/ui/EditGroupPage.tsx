import {useEffect} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useKeyboardHeight} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';
import {useGroupInfoStatus} from '../model/useGroupInfoStatus.ts';
import {useFetchEditGroup} from '../model/useFetchEditGroup.ts';
import {SelectBackgroundImage} from '~/shared/selectBackgroundImage';
import {SelectProfileImage} from '~/shared/selectProfileImage';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';

export interface EditGroupPageProps extends NativeStackScreenProps<RootMainStackParamList, 'editGroupsPage'> {}

export const EditGroupPage = ({navigation, route}: EditGroupPageProps) => {
  const {groupsId, groupIntro} = route.params;
  const keyboardHeight = useKeyboardHeight();
  const {infoStatus, isValid, ...set} = useGroupInfoStatus(groupsId, groupIntro);
  const {isPendingCreate, editGroup} = useFetchEditGroup({navigation, route}, infoStatus);
  const {name, region, intro, statusText} = infoStatus;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="link" isDisabled={!isValid} onPress={editGroup}>
          {isPendingCreate ? <ButtonSpinner /> : <ButtonText>변경하기</ButtonText>}
        </Button>
      ),
    });
  }, [isValid, infoStatus]);

  return (
    <StyledScrollContainer>
      <StyledInputContainer bottomHeight={keyboardHeight}>
        <TextLimitInput value={name} onChange={set.changeName} label={'모임 이름'} />
        <TextLimitInput value={statusText} onChange={set.changeStatusText} label={'간단한 소개'} />
        <VStack space="xs">
          <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
            활동 지역
          </Text>
          <Input isInvalid={!region}>
            <InputField type="text" value={region} onChangeText={region => set.changeRegion(region)} />
          </Input>
        </VStack>
        <SelectProfileImage />
        <SelectBackgroundImage />
        <TextAreaLimitInput label={'모임 소개글'} value={intro} onChange={set.changeIntro} placeholder={'10자 이상 작성해주세요.'} />
      </StyledInputContainer>
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
`;

const StyledInputContainer = styled.View<{bottomHeight: number}>`
  padding: 10px 20px 0 20px;
  gap: 16px;
  margin-bottom: ${({bottomHeight}) => `${bottomHeight}px`};
`;

import {useEffect} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonSpinner, ButtonText, Heading, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useKeyboardHeight} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';
import {useGroupInfoStatus} from '../model/useGroupInfoStatus.ts';
import {useFetchCreateGroup} from '../model/useFetchCreateGroup.ts';
import {SelectBackgroundImage} from '~/shared/selectBackgroundImage';
import {SelectProfileImage} from '~/shared/selectProfileImage';
import {TextAreaLimitInput, TextLimitInput} from '~/shared/input';

interface CreateGroupPageProps extends NativeStackScreenProps<RootMainStackParamList, 'createGroupPage'> {}

export const CreateGroupPage = ({navigation}: CreateGroupPageProps) => {
  const keyboardHeight = useKeyboardHeight();
  const {infoStatus, isValid, ...set} = useGroupInfoStatus();
  const {isPendingCreate, createGroup} = useFetchCreateGroup();
  const {name, region, intro, statusText} = infoStatus;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="link" isDisabled={!isValid} onPress={() => createGroup(infoStatus)}>
          {isPendingCreate ? <ButtonSpinner /> : <ButtonText>만들기</ButtonText>}
        </Button>
      ),
    });
  }, [isValid, infoStatus]);

  return (
    <StyledScrollContainer>
      <StyledInputContainer bottomHeight={keyboardHeight}>
        <StyledHeader>
          <Heading size={'xl'} color={'$primary500'} bold={true}>
            모임 만들기
          </Heading>
        </StyledHeader>
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

const StyledHeader = styled.View`
  padding: 20px 0;
`;

const StyledInputContainer = styled.View<{bottomHeight: number}>`
  padding: 0 20px;
  gap: 16px;
  margin-bottom: ${({bottomHeight}) => `${bottomHeight}px`};
`;

const StyledTextContainer = styled.View`
  flex: 1;
  padding: 10px 0 30px 0;
`;

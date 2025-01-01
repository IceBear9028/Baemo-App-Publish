import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useKeyboardHeight} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';
import {useFetchPutMyProfile} from '~/pages/profile/editProfilePage/model/useFetchPutMyProfile.ts';
import {Alert} from 'react-native';
import {FormInput, LevelSelector, GenderFormInput, BirthFormInput, ProfileImageInput} from '~/widgets/profile/myprofile';
import {MyLevelResponse} from '~/shared/mapper/userProfile';

export interface EditProfilePageProps extends NativeStackScreenProps<RootMainStackParamList, 'editProfilePage'> {}
export const EditProfilePage = ({route, navigation}: EditProfilePageProps) => {
  const keyboardHeight = useKeyboardHeight();

  const {isPending, postMyProfile} = useFetchPutMyProfile();

  const [realName, setRealName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [description, setDescription] = useState<string>('');
  // const [nickName, setNickName] = useState<string>('');
  const [level, setLevel] = useState<MyLevelResponse>(route.params.level);

  const handleSubmit = useCallback(() => {
    // if (!realName) {
    //   Alert.alert('', '필수 입력 사항을 채워주세요.');
    //   return;
    // }

    const updateProfileDTO = {
      realName: realName || route.params.realName,
      gender,
      level: level || route.params.level,
      description: description || route.params.description,
      // nickName: nickName || route.params.nickName,
    };

    console.log('updateProfileDTO 내용 확인', updateProfileDTO);
    postMyProfile(updateProfileDTO);
  }, [realName, level, gender, description, postMyProfile]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="link" onPress={handleSubmit}>
          {isPending ? <ButtonSpinner /> : <ButtonText>저장</ButtonText>}
        </Button>
      ),
    });
  }, [handleSubmit, isPending]);

  return (
    <StyledScrollContainer>
      <StyledInputContainer bottomHeight={keyboardHeight}>
        <ProfileImageInput placeholder={route.params.profileUrl} />
        <FormInput
          title={'이름'}
          value={realName}
          onChangeText={setRealName}
          placeholder={route.params.realName ?? '실명을 기입해주세요.'}
        />
        <FormInput
          title={'소개글'}
          value={description}
          onChangeText={setDescription}
          placeholder={route.params.description ?? '나를 나타낼 수 있는 소개글을 작성해주세요.'}
        />
        {/*<FormInput title={'닉네임'} value={nickName} onChangeText={setNickName} placeholder={route.params.nickName} />*/}
        <LevelSelector title={'급수'} level={level} onChange={setLevel} />
        <GenderFormInput title={'성별'} value={gender} onChange={setGender} />
        {/*<BirthFormInput title={'생일'} value={birth} onChange={setBirth} />*/}
      </StyledInputContainer>
    </StyledScrollContainer>
  );
};

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
`;

const StyledInputContainer = styled.View<{bottomHeight: number}>`
  padding: 10px 20px 50px 20px;
  gap: 30px;
  margin-bottom: ${({bottomHeight}) => `${bottomHeight}px`};
`;

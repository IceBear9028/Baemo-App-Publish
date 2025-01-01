import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchPutMyProfileForSignUp} from '../model/useFetchPutMyProfileForSignUp';

export const EditProfileSignUpButton = () => {
  const {updateMyProfile, isPending} = useFetchPutMyProfileForSignUp();
  const isExistProfile = useProfileImageStore(status => !!status.profileImage.uri);
  const isExistNickName = useSignUpUserInfoStore(status => !!status.store.nickName);
  const isDescription = useSignUpUserInfoStore(status => !!status.store.description);

  const putProfile = useCallback(() => {
    if (isDescription && isExistNickName && isExistProfile) {
      updateMyProfile();
    }
  }, [isExistNickName, isDescription, isExistProfile]);

  return (
    <StyledButtonContainer>
      <Button size="lg" isDisabled={!(isDescription && isExistNickName && isExistProfile) || isPending} onPress={putProfile}>
        {isPending && <ButtonSpinner />}
        <ButtonText>다음</ButtonText>
      </Button>
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.View`
  padding-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
`;

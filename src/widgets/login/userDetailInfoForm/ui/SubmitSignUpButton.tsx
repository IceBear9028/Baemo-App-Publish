import React from 'react';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchSignUp} from '~/widgets/login/userDetailInfoForm/model/useFetchSignUp.ts';

export const SubmitSignUpButton = () => {
  const {isPendingSignUp, fetchSignUp} = useFetchSignUp();
  const isValidSubmit = useSignUpUserInfoStore(store => store.isValidInfo());
  return (
    <Button size="lg" onPress={fetchSignUp} isDisabled={!isValidSubmit}>
      {isPendingSignUp && <ButtonSpinner />}
      <ButtonText>회원가입 완료</ButtonText>
    </Button>
  );
};

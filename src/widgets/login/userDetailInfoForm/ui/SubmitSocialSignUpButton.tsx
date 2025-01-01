import React from 'react';
import {Button, ButtonSpinner, ButtonText} from '@gluestack-ui/themed';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {useFetchSocialSignUp} from '../model/useFetchSocialSignUp.ts';

export const SubmitSocialSignUpButton = () => {
  const {isPendingSignUp, fetchSignUp} = useFetchSocialSignUp();
  const isValidSubmit = useSignUpUserInfoStore(store => store.isValidSocialInfo());

  return (
    <Button size="lg" onPress={fetchSignUp} isDisabled={!isValidSubmit || isPendingSignUp}>
      {isPendingSignUp && <ButtonSpinner />}
      <ButtonText>다음</ButtonText>
    </Button>
  );
};

import React from 'react';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const CheckPhoneInput = () => {
  const {phone} = useSignUpUserInfoStore(info => info.store);
  return (
    <VStack space="xs" style={{alignSelf: 'stretch'}}>
      <Text size="sm">전화번호 확인</Text>
      <Input variant="outline" size="lg" isReadOnly={true}>
        <InputField placeholder={phone} />
      </Input>
    </VStack>
  );
};

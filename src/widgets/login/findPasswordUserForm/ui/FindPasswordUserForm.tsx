import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useFindPasswordInfoForm} from '../model/useFindPasswordInfoForm.ts';
import {useFetchInitFindPassword} from '~/features/login/fetchInitFindPassword';

export const FindPasswordUserForm = () => {
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {isValidPhone, errorMessage, phone, editPhone} = useFindPasswordInfoForm();
  const {isPendingCheck, initVerification} = useFetchInitFindPassword(phone);

  return (
    <Fragment>
      <StyledInputContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">휴대폰 번호</Text>
          <Input variant="outline" size="lg" isInvalid={isValidPhone} isReadOnly={false}>
            <InputField placeholder="- 없이 입력해주세요." value={phone} onChangeText={editPhone} keyboardType={'number-pad'} />
          </Input>
        </VStack>
        <Text size="sm">{errorMessage}</Text>
      </StyledInputContainer>
      <StyledButtonContainer style={{marginBottom: keyboardHeight}}>
        <Button size="lg" onPress={initVerification} isDisabled={isValidPhone || isPendingCheck}>
          {isPendingCheck && <ButtonSpinner />}
          <ButtonText>다음</ButtonText>
        </Button>
      </StyledButtonContainer>
    </Fragment>
  );
};

const StyledInputContainer = styled.View`
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledButtonContainer = styled(Animated.View)`
  padding-left: 20px;
  padding-right: 20px;
`;

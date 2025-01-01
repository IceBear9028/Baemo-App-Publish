import React, {Fragment} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useVerificationInfo} from '../model/useVerificationInfo.ts';
import {useFetchInitVerificationAccount} from '~/features/login/fetchInitVerificationAccount';

export const UserVerificationInfoForm = () => {
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {phoneNumber, isValidPhone, errorMessage, editPhone} = useVerificationInfo();
  const {isPendingInit, initVerification} = useFetchInitVerificationAccount(phoneNumber);
  return (
    <Fragment>
      <StyledContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">휴대폰 번호</Text>
          <Input variant="outline" size="lg" isInvalid={isValidPhone} isReadOnly={false}>
            <InputField placeholder="- 없이 입력해주세요." value={phoneNumber} onChangeText={editPhone} keyboardType={'number-pad'} />
          </Input>
        </VStack>
        <Text size="sm">{errorMessage}</Text>
      </StyledContainer>
      <StyledButtonContainer style={{marginBottom: keyboardHeight}}>
        <Button size="lg" onPress={initVerification} isDisabled={isValidPhone || isPendingInit}>
          {isPendingInit && <ButtonSpinner />}
          <ButtonText>다음</ButtonText>
        </Button>
      </StyledButtonContainer>
    </Fragment>
  );
};

const StyledContainer = styled.View`
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledButtonContainer = styled(Animated.View)`
  padding-left: 20px;
  padding-right: 20px;
`;

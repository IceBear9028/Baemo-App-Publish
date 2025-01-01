import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, useStyled, VStack} from '@gluestack-ui/themed';
import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {useCodeStatus} from '~/widgets/login/verificationCodeForm/model/useCodeStatus.ts';
import {formatSecToMin} from '~/shared/utils/lib/transformDateTime.ts';
import {useFetchCheckPhone} from '../model/useFetchCheckPhone.ts';
import {useIniTimer} from '../model/useIniTimer.ts';
import {Animated} from 'react-native';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useFetchInitVerificationAccount} from '~/features/login/fetchInitVerificationAccount';

interface VerificationCodeFormProps {
  phone: string;
}

export const VerificationCodeForm = ({phone}: VerificationCodeFormProps) => {
  const glueStackStyle = useStyled();
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {remainTime, resetTimer} = useIniTimer();
  const {authCode, isAuthCode, setCodeStatus} = useCodeStatus();
  const {isPendingCheck, checkPhone} = useFetchCheckPhone(authCode, remainTime);
  const {isPendingInit, initVerification} = useFetchInitVerificationAccount(phone, resetTimer);
  return (
    <Fragment>
      <StyledInputGroup>
        <StyledInfoContainer>
          <StyledTimerGroup>
            <Text size={'sm'} bold={true}>
              남은시간
            </Text>
            <StyledTimerDivider background={glueStackStyle.config.tokens.colors.trueGray200} />
            <Text size={'sm'} color={'$warning500'} bold>
              {formatSecToMin(remainTime)}
            </Text>
          </StyledTimerGroup>
          <Button variant={'link'} size={'sm'} onPress={initVerification}>
            {isPendingInit && <ButtonSpinner />}
            <ButtonText>재인증</ButtonText>
          </Button>
        </StyledInfoContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">인증번호 입력</Text>
          <Input variant="outline" size="lg" isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="6자리 입력" value={authCode} onChangeText={setCodeStatus} keyboardType={'number-pad'} />
          </Input>
        </VStack>
      </StyledInputGroup>
      <StyledButtonContainer style={{marginBottom: keyboardHeight}}>
        <Button size="lg" onPress={checkPhone} isDisabled={!isAuthCode}>
          {isPendingCheck && <ButtonSpinner />}
          <ButtonText>다음</ButtonText>
        </Button>
      </StyledButtonContainer>
    </Fragment>
  );
};

const StyledInputGroup = styled.View`
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledButtonContainer = styled(Animated.View)`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTimerGroup = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const StyledTimerDivider = styled.View<{background: string}>`
  width: 2px;
  height: 20px;
  background: ${({background}) => background};
`;

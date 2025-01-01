import {Animated} from 'react-native';
import React, {Fragment} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonSpinner, ButtonText, Input, InputField, Text, useStyled, VStack} from '@gluestack-ui/themed';
import {useRemainTimer} from '../model/useRemainTimer.ts';
import {useAuthCodeStatus} from '../model/useAuthCodeStatus.ts';
import {formatSecToMin} from '~/shared/utils/lib/transformDateTime.ts';
import {useAnimatedKeyboardHeight} from '~/shared/utils';
import {useFetchInitFindPassword} from '~/features/login/fetchInitFindPassword';
import {useFetchFindPasswordAuthCode} from '~/widgets/login/findPasswordAuthCodeForm/model/useFetchFindPasswordAuthCode.ts';

interface FindPasswordAuthCodeFormProps {
  phone: string;
}

export const FindPasswordAuthCodeForm = ({phone}: FindPasswordAuthCodeFormProps) => {
  const glueStackStyle = useStyled();
  const keyboardHeight = useAnimatedKeyboardHeight();
  const {remainTime, resetTimer} = useRemainTimer();
  const {isAuthCode, authCode, setCodeStatus} = useAuthCodeStatus();
  const {isPendingAuth, checkPhone} = useFetchFindPasswordAuthCode(phone, remainTime);
  const {isPendingCheck, initVerification} = useFetchInitFindPassword(phone, resetTimer);
  return (
    <Fragment>
      <StyledInputContainer>
        <StyledTimerContainer>
          <StyledTimer>
            <Text size={'sm'} bold={true}>
              남은시간
            </Text>
            <StyledTimerDivider background={glueStackStyle.config.tokens.colors.trueGray200} />
            <Text size={'sm'} color={'$warning500'} bold>
              {formatSecToMin(remainTime)}
            </Text>
          </StyledTimer>
          <Button variant={'link'} size={'sm'} onPress={initVerification}>
            {isPendingCheck && <ButtonSpinner />}
            <ButtonText>재인증</ButtonText>
          </Button>
        </StyledTimerContainer>
        <VStack space="xs" style={{alignSelf: 'stretch'}}>
          <Text size="sm">인증번호 입력</Text>
          <Input variant="outline" size="lg">
            <InputField placeholder="6자리 입력" value={authCode} onChangeText={setCodeStatus} keyboardType={'number-pad'} />
          </Input>
        </VStack>
      </StyledInputContainer>
      <StyledButtonContainer style={{marginBottom: keyboardHeight}}>
        <Button size="lg" onPress={() => checkPhone(phone, authCode)} isDisabled={!isAuthCode}>
          {isPendingAuth && <ButtonSpinner />}
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

const StyledTimerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTimer = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const StyledTimerDivider = styled.View<{background: string}>`
  width: 2px;
  height: 20px;
  background: ${({background}) => background};
`;

const StyledButtonContainer = styled(Animated.View)`
  padding-left: 20px;
  padding-right: 20px;
`;

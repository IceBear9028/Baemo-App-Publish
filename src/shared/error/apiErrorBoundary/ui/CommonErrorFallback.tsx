import React, {ReactElement} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import {AxiosError} from 'axios';
import {CommonRes} from '~/shared/fetch';

export interface ErrorBoundaryProps {
  error: AxiosError<CommonRes<unknown>>;
  resetError: () => void;
}

export interface CommonErrorFallbackProps extends ErrorBoundaryProps {
  title: string;
  children: ReactElement;
}

export const CommonErrorFallback = ({error, resetError, title, children}: CommonErrorFallbackProps) => {
  const errorCode = error.response?.data.code;
  return (
    <StyledContainer>
      <StyledContentContainer>
        {children}
        <StyledTextGroup>
          <Text size="md" color="$textLight800">
            {title}
          </Text>
          {errorCode && <Text size="sm" color="$text400">{`Status-Code : ${errorCode}`}</Text>}
        </StyledTextGroup>
      </StyledContentContainer>
      <Button onPress={resetError} action="secondary" size="xs">
        <ButtonText>다시 시도하기</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;

const StyledContentContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const StyledTextGroup = styled.View`
  gap: 8px;
`;

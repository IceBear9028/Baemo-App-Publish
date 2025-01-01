import React from 'react';
import styled from 'styled-components/native';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useValidName} from '../model/useValidName.ts';

interface InputNameFormProps {
  isReadOnly?: boolean;
}

export const InputNameForm = ({isReadOnly}: InputNameFormProps) => {
  const {name, changeName, errorMessage, isValidName} = useValidName();
  return (
    <StyledContainer>
      <VStack space="xs" style={{alignSelf: 'stretch'}}>
        <Text color="$textLight700" size="sm">
          이름
        </Text>
        <Input variant="outline" size="lg" isInvalid={isValidName} isReadOnly={isReadOnly}>
          <InputField placeholder="이름을 작성해주세요." value={name} onChangeText={changeName} />
        </Input>
      </VStack>
      <Text size="sm">{errorMessage}</Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

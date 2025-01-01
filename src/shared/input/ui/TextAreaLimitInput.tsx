import React from 'react';
import styled from 'styled-components/native';
import {Text, Textarea, TextareaInput, VStack} from '@gluestack-ui/themed';
import {useTextLengthValidate} from '~/shared/input/model/useTextLengthValidate.ts';

interface TitleInputProps {
  label?: string;
  limitLength?: number;
  value: string;
  onChange: (input: string) => void;
  placeholder?: string;
  height?: number;
}

export const TextAreaLimitInput = ({
  label = '이름',
  placeholder = '나누고 싶은 생각을 적어주세요.',
  value,
  limitLength = 1000,
  onChange,
  height = 600,
}: TitleInputProps) => {
  const {textLength, checkValidate} = useTextLengthValidate(limitLength, value);
  return (
    <VStack space="xs">
      <StyledTextContainer>
        <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
          {label}
        </Text>
        <StyledLengthContainer>
          <Text color="$textLight400" lineHeight="$xs" size={'xs'}>
            {textLength}
          </Text>
          <Text color="$textLight400" lineHeight="$xs" size={'xs'}>
            /
          </Text>
          <Text color="$textLight400" lineHeight="$xs" size={'xs'}>
            {limitLength}
          </Text>
        </StyledLengthContainer>
      </StyledTextContainer>
      <StyledTextAreaContainer>
        <Textarea style={{flex: 1, borderWidth: 1}} height={height}>
          <TextareaInput placeholder={placeholder} value={value} onChangeText={text => checkValidate(text, onChange)} />
        </Textarea>
      </StyledTextAreaContainer>
    </VStack>
  );
};

const StyledTextContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const StyledLengthContainer = styled.View`
  flex-direction: row;
  gap: 2px;
`;

const StyledTextAreaContainer = styled.View`
  flex: 1;
  padding: 10px 0 30px 0;
`;

import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {useTextLengthValidate} from '~/shared/input/model/useTextLengthValidate.ts';
import styled from 'styled-components/native';

interface TitleInputProps {
  label?: string;
  limitLength?: number;
  value: string;
  onChange: (input: string) => void;
  errorMessage?: string;
}

export const TextLimitInput = ({label = '이름', value, limitLength = 20, errorMessage = '', onChange}: TitleInputProps) => {
  const {textLength, checkValidate} = useTextLengthValidate(limitLength, value);
  return (
    <VStack space="xs">
      <StyledTextContainer>
        <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
          {label}
        </Text>
        <StyledLengthContainer>
          <Text color="$textLight500" lineHeight="$xs" size={'xs'}>
            {textLength}
          </Text>
          <Text color="$textLight500" lineHeight="$xs" size={'xs'}>
            /
          </Text>
          <Text color="$textLight500" lineHeight="$xs" size={'xs'}>
            {limitLength}
          </Text>
        </StyledLengthContainer>
      </StyledTextContainer>
      <Input>
        <InputField type="text" value={value} onChangeText={name => checkValidate(name, onChange)} />
      </Input>
      {errorMessage && (
        <Text size={'xs'} color={'$error400'}>
          {errorMessage}
        </Text>
      )}
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

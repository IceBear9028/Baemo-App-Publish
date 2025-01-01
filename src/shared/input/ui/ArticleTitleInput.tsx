import {Input, InputField, Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useTextLengthValidate} from '~/shared/input/model/useTextLengthValidate.ts';

interface TitleInputProps {
  label?: string;
  limitLength?: number;
  value: string;
  onChange: (input: string) => void;
}

export const ArticleTitleInput = ({label = '제목을 입력하세요', value, limitLength = 20, onChange}: TitleInputProps) => {
  const {textLength, checkValidate} = useTextLengthValidate(limitLength, value);
  return (
    <StyledTitleContainer>
      <StyledLengthContainer>
        <Text color="$textLight400" lineHeight="$xs" size={'2xs'}>
          {textLength}
        </Text>
        <Text color="$textLight400" lineHeight="$xs" size={'2xs'}>
          /
        </Text>
        <Text color="$textLight400" lineHeight="$xs" size={'2xs'}>
          {limitLength}
        </Text>
      </StyledLengthContainer>
      <Input size={'xl'} variant={'underlined'} borderColor={'#ffffff'} paddingTop={0} height={30}>
        <InputField
          style={{
            fontWeight: 'bold',
            height: 30,
            padding: 0,
          }}
          placeholder={label}
          type={'text'}
          value={value}
          onChangeText={name => checkValidate(name, onChange)}
        />
      </Input>
    </StyledTitleContainer>
  );
};

const StyledTitleContainer = styled.View`
  padding: 18px 20px 0 20px;
`;

const StyledLengthContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 2px;
`;

import {Text, useToken} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Animated, TextInput} from 'react-native';
import {useTextLengthValidate} from '~/shared/input/model/useTextLengthValidate.ts';

interface TitleInputProps {
  label?: string;
  limitLength?: number;
  value: string;
  onChange: (input: string) => void;
}

export const ArticleContentInput = ({label = '나누고 싶은 생각을 적어주세요', value, limitLength = 20, onChange}: TitleInputProps) => {
  const bodyTextColor = useToken('colors', 'textLight800');
  const placeHolderColor = useToken('colors', 'textLight400');
  const {textLength, checkValidate} = useTextLengthValidate(limitLength, value);
  return (
    <StyledContainer>
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
      <StyledTextContainer>
        <TextInput
          multiline
          placeholderTextColor={placeHolderColor}
          style={{flexShrink: 1, color: bodyTextColor, minHeight: 200}}
          value={value}
          textAlignVertical="top"
          onChangeText={text => checkValidate(text, onChange)}
          placeholder={label}
          scrollEnabled={false}
        />
      </StyledTextContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledLengthContainer = styled.View`
  padding: 0 20px 0 20px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2px;
`;

const StyledTextContainer = styled(Animated.View)`
  flex: 1;
  padding: 0 20px 30px 20px;
`;

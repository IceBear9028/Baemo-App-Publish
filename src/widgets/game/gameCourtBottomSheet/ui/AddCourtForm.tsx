import styled from 'styled-components/native';
import {useFetchCreateGameCourt} from '~/widgets/game/gameCourtBottomSheet/model/useFetchCreateGameCourt.ts';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {NumberInput} from '~/shared/ui';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';

interface AddCourtFormProps {
  extendBottomSheet?: () => void;
}

export const AddCourtForm = ({extendBottomSheet}: AddCourtFormProps) => {
  const {createGameCourt} = useFetchCreateGameCourt();
  const [courtNumber, setCourtNumber] = useState<string>('');

  function createCourt() {
    if (!Number(courtNumber) || Number(courtNumber) > 100) {
      Alert.alert('코트번호입력', '유효한 숫자, 혹은 1~100 범위의 번호를 입력해주세요.');
      return;
    }
    createGameCourt(Number(courtNumber));
    setCourtNumber('');
  }

  return (
    <StyledContainer>
      <Text bold>코트 추가</Text>
      <StyledFormContainer>
        <StyledInputContainer>
          <NumberInput
            size={'sm'}
            name={''}
            placeholder={'코트번호를 입력해주세요.'}
            value={courtNumber}
            onChangeNumber={setCourtNumber}
            onFocus={extendBottomSheet}
          />
        </StyledInputContainer>
        <Button size={'sm'} onPress={createCourt}>
          <ButtonText>추가</ButtonText>
        </Button>
      </StyledFormContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

const StyledFormContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: 16px;
`;

const StyledInputContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;

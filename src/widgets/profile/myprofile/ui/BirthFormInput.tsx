import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import DateIcon from '~/shared/images/svg/select_date.svg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {transProfileDate} from '~/shared/utils/lib/transformDateTime.ts';

interface BirthFormInputProps {
  title: string;
  value: string;
  onChange: (input: string) => void;
}

export const BirthFormInput = ({title, value, onChange}: BirthFormInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  return (
    <StyledContainer onPress={showDatePicker}>
      <StyledInputContainer>
        <VStack space="xs">
          <Text color="$text700" lineHeight="$xs" size={'sm'}>
            {title}
          </Text>
          <Input isReadOnly={true}>
            <InputField type="text" value={value} />
          </Input>
        </VStack>
      </StyledInputContainer>
      <StyledButtonContainer>
        <DateIcon />
      </StyledButtonContainer>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => {
          onChange(transProfileDate(date));
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        locale={'ko'}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
`;

const StyledInputContainer = styled.View`
  flex: 1;
`;

const StyledButtonContainer = styled.View`
  justify-content: flex-end;
  padding-bottom: 8px;
`;

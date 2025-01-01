import styled from 'styled-components/native';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import DateIcon from '~/shared/images/svg/select_date.svg';
import {useState} from 'react';
import {transformDate} from '~/shared/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface SelectDateButtonProps {
  title?: string;
  isDisabled?: boolean;
  onSelectDate: (date: Date) => void;
}

export const SelectDateInput = ({title = '날짜선택', onSelectDate, isDisabled}: SelectDateButtonProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [dateString, setDateString] = useState<string>('');

  function showDatePicker() {
    if (!isDisabled) {
      setDatePickerVisibility(true);
    }
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(date: Date) {
    console.warn('A date has been picked: ', transformDate(date));
    setDateString(transformDate(date));
    onSelectDate(date);
    hideDatePicker();
  }

  return (
    <StyledContainer onPress={showDatePicker}>
      <StyledInputContainer>
        <VStack space="xs">
          <Text color="$text700" lineHeight="$xs" size={'sm'}>
            {title}
          </Text>
          <Input isReadOnly={true} isDisabled={isDisabled}>
            <InputField type="text" value={dateString} />
          </Input>
        </VStack>
      </StyledInputContainer>
      <StyledButtonContainer>
        <DateIcon />
      </StyledButtonContainer>
      <DateTimePicker isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} locale={'ko'} />
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

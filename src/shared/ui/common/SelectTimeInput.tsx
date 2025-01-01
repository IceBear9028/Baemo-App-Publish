import {useState} from 'react';
import styled from 'styled-components/native';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import TimeIcon from '~/shared/images/svg/select_time.svg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {transformTime} from '~/shared/utils/lib/transformDateTime.ts';

interface SelectDateButtonProps {
  title?: string;
  onSelectTime: (date: Date) => void;
  isError?: boolean;
}

export const SelectTimeInput = ({title = '시간선택', onSelectTime, isError}: SelectDateButtonProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [dateString, setDateString] = useState<string>('');

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(date: Date) {
    console.warn('A date has been picked: ', transformTime(date));
    setDateString(transformTime(date));
    onSelectTime(date);
    hideDatePicker();
  }

  return (
    <StyledContainer onPress={showDatePicker}>
      <StyledInputContainer>
        <VStack space="xs">
          <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
            {title}
          </Text>
          <Input isInvalid={isError} isReadOnly={true}>
            <InputField type="text" value={dateString} />
          </Input>
        </VStack>
      </StyledInputContainer>
      <StyledButtonContainer>
        <TimeIcon />
      </StyledButtonContainer>
      <DateTimePicker isVisible={isDatePickerVisible} mode="time" onConfirm={handleConfirm} onCancel={hideDatePicker} locale={'ko'} />
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

import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimeIcon from '~/shared/images/svg/select_time.svg';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import {transformDatetime} from '~/shared/utils/lib/transformDateTime.ts';

interface SelectDatetimeButtonProps {
  title?: string;
  onSelectDateTime: (date: Date) => void;
  errorMessage?: string;
  isError?: boolean;
  date?: Date | null;
}

export const SelectDatetimeInput = ({title = '시간선택', onSelectDateTime, isError, errorMessage, date}: SelectDatetimeButtonProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [dateString, setDateString] = useState<string>('');

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(updateDate: Date) {
    setDateString(transformDatetime(updateDate));
    onSelectDateTime(updateDate);
    hideDatePicker();
  }

  useEffect(() => {
    if (date) {
      setDateString(transformDatetime(date));
    }
  }, [date]);

  return (
    <StyledContainer onPress={showDatePicker}>
      <VStack space="xs">
        <StyledHeaderContainer>
          <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
            {title}
          </Text>
        </StyledHeaderContainer>
        <Input isInvalid={isError} isReadOnly={true}>
          <InputField type="text" value={dateString} />
          <StyledButtonContainer>
            <TimeIcon />
          </StyledButtonContainer>
        </Input>
      </VStack>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        minuteInterval={10}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale={'ko'}
        date={date ? date : undefined}
      />
      {errorMessage && (
        <Text size={'xs'} color={'$error400'}>
          {errorMessage}
        </Text>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  gap: 6px;
`;

const StyledInputContainer = styled.View`
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const StyledButtonContainer = styled.View`
  justify-content: flex-end;
  padding-bottom: 8px;
  padding-right: 8px;
`;

import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimeIcon from '~/shared/images/svg/select_time.svg';
import {add, differenceInMinutes, getHours, getMinutes, setHours, setMinutes, setSeconds} from 'date-fns';

interface SelectTimeRangeProps {
  title?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onSelectTime: (date: Date) => void;
  errorMessage?: string;
  isError?: boolean;
}

function getInitDate(startDate: Date, endDate: Date) {
  // 두 날짜 간의 차이를 분 단위로 계산
  const totalMinutes = differenceInMinutes(endDate, startDate);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const initDate = setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0);

  const showHours = hours !== 0 ? `${hours}시간 ` : '';
  const showMinute = minutes !== 0 ? `${minutes}분` : '';

  return {
    initDate,
    rangeDateString: showHours + showMinute,
  };
}

export const SelectTimeRangeInput = ({
  title = '시간선택',
  onSelectTime,
  isError,
  startDate,
  endDate,
  errorMessage,
}: SelectTimeRangeProps) => {
  const [rangeTime, setRangeTime] = useState<Date | null>(null);
  const [dateString, setDateString] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  // DatePicker 열기
  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  // DatePicker 닫기
  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  // 사용자가 시간 선택 후 확인
  function handleConfirm(date: Date) {
    const hoursToAdd = getHours(date);
    const minutesToAdd = getMinutes(date);
    if (!isNaN(hoursToAdd) && !isNaN(minutesToAdd)) {
      setRangeTime(date);
      const showHours = hoursToAdd !== 0 ? `${hoursToAdd}시간 ` : '';
      const showMinute = minutesToAdd !== 0 ? `${minutesToAdd}분` : '';
      setDateString(showHours + showMinute);
      hideDatePicker();
    } else {
      console.log('유효한 시간을 입력하세요.');
      hideDatePicker();
    }
  }

  // 초기값 설정
  useEffect(() => {
    console.log('startDate && endDate', startDate, endDate);
    if (startDate && endDate) {
      const {initDate, rangeDateString} = getInitDate(startDate, endDate);
      setRangeTime(prevRangeTime => {
        // 값이 동일하면 상태 업데이트 방지
        if (prevRangeTime?.getTime() === initDate.getTime()) {
          return prevRangeTime;
        }
        return initDate;
      });
      setDateString(rangeDateString);
    }
  }, [startDate]);

  // rangeTime을 기준으로 시간 더하기
  useEffect(() => {
    if (startDate && rangeTime) {
      const hoursToAdd = getHours(rangeTime);
      const minutesToAdd = getMinutes(rangeTime);
      const updatedDate = add(startDate, {hours: hoursToAdd, minutes: minutesToAdd});
      onSelectTime(updatedDate); // 부모 컴포넌트에 시간 전달
    }
  }, [rangeTime]); // startDate를 여기서 의존성에 넣지 않음

  return (
    <StyledContainer onPress={showDatePicker}>
      <StyledInputContainer>
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
      </StyledInputContainer>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        date={rangeTime || new Date()} // rangeTime이 없으면 현재 날짜 사용
        mode="time"
        is24Hour={true}
        locale="en_GB"
        minuteInterval={10}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
  flex-direction: row;
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

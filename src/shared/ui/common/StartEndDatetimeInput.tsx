import styled from 'styled-components/native';
import {SelectDatetimeInput} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';

interface StartEndDatetimeInputProps {
  onStartDate: (input: Date) => void;
  onEndDate: (input: Date) => void;
  errorMessage: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const StartEndDatetimeInput = ({onStartDate, onEndDate, errorMessage, startDate, endDate}: StartEndDatetimeInputProps) => {
  return (
    <StyledContainer>
      <SelectDatetimeInput title={'시작시간'} onSelectDateTime={onStartDate} date={startDate} />
      <SelectDatetimeInput title={'종료시간'} onSelectDateTime={onEndDate} date={endDate} />
      {errorMessage && (
        <Text size={'xs'} color={'$error400'}>
          {errorMessage}
        </Text>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 8px;
`;

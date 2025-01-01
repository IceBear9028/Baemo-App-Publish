import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator = ({date}: DateSeparatorProps) => {
  return (
    <StyledContainer>
      <Line />
      <DateText>{date}</DateText>
      <Line />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;
const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #e4e4e7;
`;
const DateText = styled.Text`
  background-color: #f4f4f5;
  font-size: 12px;
  padding: 0 5px;
  color: black;
  margin: 0 10px;
`;

import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';

export const FallbackTeam = () => {
  return (
    <StyledContainer>
      <Text size={'sm'} color={'$textLight950'}>
        팀이 지정되지 않았습니다.
      </Text>
      <Text size={'sm'} color={'$primary500'} bold={true}>
        팀이 지정되지 않으면 점수를 기록할 수 없습니다.
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  height: 120px;
  align-items: center;
  justify-content: center;
`;

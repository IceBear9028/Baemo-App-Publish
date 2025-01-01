import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';

export const HeaderSection = () => {
  return (
    <StyledContainer>
      <StyledInfoContainer>
        <StyledGameTitleSection>
          <Text color={'$textLight800'} bold>
            {'스코어 보드'}
          </Text>
        </StyledGameTitleSection>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  padding: 16px 0;
  gap: 12px;
  justify-content: space-between;
`;

const StyledInfoContainer = styled.View``;

const StyledGameTitleSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

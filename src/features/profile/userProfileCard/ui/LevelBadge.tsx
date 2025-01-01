import styled from 'styled-components/native';

interface LevelBadgeProp {
  level: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'N';
}
export const LevelBadge = ({level}: LevelBadgeProp) => {
  return (
    <StyledContainer>
      <CustomText>{level}조</CustomText>
    </StyledContainer>
  );
};

const StyledContainer = styled.View``;

const CustomText = styled.Text`
  margin-top: 2px;
  font-size: 12px;
  color: #16a34a;
  font-weight: bold;
  border-width: 2px;
  border-radius: 3px;
  border-color: #16a34a;
  text-align: center;
  padding: 2px 4px 0 4px;
`;

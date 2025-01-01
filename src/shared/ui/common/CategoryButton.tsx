import {ReactElement} from 'react';
import styled from 'styled-components/native';
import ArrowIcon from '~/shared/images/svg/game_arrow.svg';

interface CategoryButtonProps {
  icon?: ReactElement;
  children?: ReactElement;
  onPress?: () => void;
  showArrowIcon?: boolean;
}

export const CategoryButton = ({icon, onPress, children, showArrowIcon = true}: CategoryButtonProps) => {
  return (
    <StyledContainer onPress={onPress}>
      <StyledContentsContainer>
        {icon && icon}
        {children && children}
      </StyledContentsContainer>
      {showArrowIcon && <ArrowIcon />}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  background: #f3f3f3;
  flex-direction: row;
  height: 76px;
  padding: 0 20px;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
`;

const StyledContentsContainer = styled.View`
  flex-direction: row;
  gap: 13px;
  align-items: center;
`;

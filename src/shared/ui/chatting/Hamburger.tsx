import styled from 'styled-components/native';
import HamburgerIcon from '~/shared/images/svg/more_vert.svg';

interface HamburgerProps {
  onPress?: () => void;
}

export const Hamburger = ({onPress}: HamburgerProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <HamburgerIcon style={{width: 15, height: 15}} />
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable``;

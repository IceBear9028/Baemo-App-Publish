import styled from 'styled-components/native';
import MoreIcon from '~/shared/images/svg/more_horiz.svg';

interface MoreButtonProps {
  onPress?: () => void;
}

export const MoreButton = ({onPress}: MoreButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <MoreIcon style={{width: 10, height: 10}} />
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable``;

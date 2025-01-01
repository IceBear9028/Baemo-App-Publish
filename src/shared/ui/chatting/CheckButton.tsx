import styled from 'styled-components/native';
import CheckButtonIcon from '~/shared/images/svg/friendbutton.svg';

interface CheckButtonProps {
  onPress?: () => void;
}

export const CheckButton = ({onPress}: CheckButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <CheckButtonIcon style={{width: 10, height: 10}} />
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.TouchableOpacity`
  padding: 16px 0 16px 16px;
`;

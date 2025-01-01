import styled from 'styled-components/native';
import CheckedButtonIcon from '~/shared/images/svg/selectfriendbutton.svg';

interface CheckedButtonProps {
  onPress?: () => void;
}

export const CheckedButton = ({onPress}: CheckedButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <CheckedButtonIcon style={{width: 10, height: 10}} />
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.TouchableOpacity`
  padding: 16px 0 16px 16px;
`;

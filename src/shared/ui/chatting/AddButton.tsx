import styled from 'styled-components/native';
import AddIcon from '~/shared/images/svg/plus.svg';

interface AddButtonProps {
  onPress?: () => void;
}

export const AddButton = ({onPress}: AddButtonProps) => {
  return (
    <StyledPressContainer onPress={onPress}>
      <AddIcon style={{width: 10, height: 10}} />
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable``;

import {MaterialIndicator} from 'react-native-indicators';
import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';

interface SpinnerSize {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingSpinner = ({size}: SpinnerSize) => {
  const color = useToken('colors', 'primary500');
  switch (size) {
    case 'xs':
      return <MaterialIndicator color={color} size={12} trackWidth={2} />;
    case 'sm':
      return <MaterialIndicator color={color} size={16} trackWidth={2} />;
    default:
      return <MaterialIndicator color={color} size={30} trackWidth={3} />;
  }
};

export const LoadingPageSpinner = () => {
  const color = useToken('colors', 'primary500');
  return (
    <StyledContainer>
      <StyledFix />
      <StyledIndicatorContainer>
        <MaterialIndicator color={color} size={30} trackWidth={3} />
      </StyledIndicatorContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: 30px 20px;
`;

const StyledIndicatorContainer = styled.View``;

const StyledFix = styled.View`
  height: 30%;
`;

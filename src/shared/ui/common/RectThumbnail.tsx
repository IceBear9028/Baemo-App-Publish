import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import BadmintonIcon from '~/shared/images/svg/exercise-icon.svg';

interface ExerciseProfileProps {
  src?: string;
}

const FallbackIcon = () => {
  return (
    <StyledFallback>
      <BadmintonIcon />
    </StyledFallback>
  );
};

export const RectThumbnail = ({src}: ExerciseProfileProps) => {
  const colorToken = useToken('colors', 'textLight50');
  return <StyledContainer background={colorToken}>{src ? <StyledImg src={src} /> : <FallbackIcon />}</StyledContainer>;
};

const StyledContainer = styled.View<{background: string}>`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  overflow: hidden;
  background: ${({background}) => background};
`;

const StyledFallback = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.Image`
  flex: 1;
`;

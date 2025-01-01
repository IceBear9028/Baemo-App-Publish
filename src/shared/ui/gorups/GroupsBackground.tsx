import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';

interface GatheringBackgroundProps {
  src?: string;
}

export const GroupsBackground = ({src}: GatheringBackgroundProps) => {
  const colorToken = useToken('colors', 'light200');
  return (
    <StyledContainer background={colorToken}>
      <StyledImg src={src} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{background: string}>`
  height: 200px;
  align-self: stretch;
  overflow: hidden;
  background: ${({background}) => background};
  border-radius: 10px;
`;

const StyledImg = styled.Image`
  flex: 1;
`;

import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';

interface GatheringThumbnailProps {
  src?: string;
}

export const GroupsThumbnail = (props: GatheringThumbnailProps) => {
  const colorToken = useToken('colors', 'light200');
  return (
    <StyledContainer background={colorToken}>
      <StyledImg src={props.src} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{background: string}>`
  height: 90px;
  align-self: stretch;
  overflow: hidden;
  background: ${({background}) => background};
`;

const StyledImg = styled.Image`
  flex: 1;
`;

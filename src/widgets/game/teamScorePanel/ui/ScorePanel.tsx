import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Heading} from '@gluestack-ui/themed';

interface TeamScorePanelProps {
  value: number;
  upScore: () => void;
}

export const ATeamScorePanel = ({value, upScore}: TeamScorePanelProps) => {
  const fontColor = useToken('colors', 'rose700');
  return (
    <StyledContainer direction={'left'}>
      <StyledScoreContainer>
        <StyledButton onPress={upScore}>
          <StyledScoreText $color={fontColor}>{value ? value : 0}</StyledScoreText>
        </StyledButton>
      </StyledScoreContainer>
    </StyledContainer>
  );
};

export const BTeamScorePanel = ({value, upScore}: TeamScorePanelProps) => {
  const fontColor = useToken('colors', 'lightBlue700');
  return (
    <StyledContainer direction={'right'}>
      <StyledScoreContainer>
        <StyledButton onPress={upScore}>
          <StyledScoreText $color={fontColor}>{value ? value : 0}</StyledScoreText>
        </StyledButton>
      </StyledScoreContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.Pressable<{direction: 'left' | 'right'}>`
  flex: 1;
  border-radius: 16px;
  justify-content: center;
  align-items: ${({direction}) => (direction === 'left' ? 'flex-start' : 'flex-end')};
`;

const StyledScoreContainer = styled.View`
  align-self: stretch;
  align-items: center;
`;

const StyledButton = styled.Pressable``;

const StyledScoreText = styled.Text<{$color: string}>`
  font-size: 200px;
  font-weight: 700;
  ${({$color}) => ($color ? `color : ${$color}` : '')};
`;

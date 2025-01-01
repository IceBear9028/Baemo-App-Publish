import styled from 'styled-components/native';
import {Game} from '~/shared/mapper/exercise';
import {TeamA, TeamB} from './TeamSection.tsx';
import {ScoreSection} from './ScoreSection.tsx';
import {HeaderSection} from './HeaderSection.tsx';
import {useToken} from '@gluestack-style/react';

interface GameViewCardProps extends Game {}

export const GameScoreSection = (props: GameViewCardProps) => {
  const borderColor = useToken('colors', 'trueGray200');
  return (
    <StyledContainer borderColor={borderColor}>
      <HeaderSection />
      <StyledBody>
        <TeamA team={props.teamA} />
        <ScoreSection teamAScore={props.teamA.score} teamBScore={props.teamB.score} status={props.gameStatus} type={props.gameType} />
        <TeamB team={props.teamB} />
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{borderColor: string}>`
  gap: 4px;
  padding: 0 0 24px 0;
  border-bottom-width: 1px;
  border-color: ${({borderColor}) => borderColor};
`;

const StyledBody = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

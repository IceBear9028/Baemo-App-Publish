import {Fragment} from 'react';
import {Heading} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {GameStatusBadge} from '~/shared/ui';
import {GameStatus, GameType} from '~/shared/mapper/exercise';

interface ScoreSectionProps {
  teamAScore: number;
  teamBScore: number;
  status: keyof GameStatus;
  type: keyof GameType;
}

const ScoreBoard = ({teamAScore, teamBScore, status}: Omit<ScoreSectionProps, 'type'>) => {
  // 1. 게임 시작 전
  if (status === 0 || status === 1) {
    return (
      <Heading size={'md'} color={'$textLight950'}>
        대기중
      </Heading>
    );
  }
  if (status === 3) {
    return (
      <Heading size={'md'} color={'$textLight950'}>
        점수 기록중...
      </Heading>
    );
  }
  return (
    <Fragment>
      <Score>
        <Heading size={'xl'} color={'$textLight950'}>
          {teamAScore}
        </Heading>
      </Score>
      <DividerContainer>
        <DividerPoint />
        <DividerPoint />
      </DividerContainer>
      <Score>
        <Heading size={'xl'} color={'$textLight950'}>
          {teamBScore}
        </Heading>
      </Score>
    </Fragment>
  );
};

export const ScoreSection = ({teamAScore, teamBScore, status, type}: ScoreSectionProps) => {
  const score = {teamAScore, teamBScore, status};
  return (
    <StyledContainer>
      <BadgeContainer>
        <GameStatusBadge status={status} />
      </BadgeContainer>
      <ScoreContainer>{type === 1 ? <ScoreBoard {...score} /> : <Heading color={'$textLight950'}>팀 미지정</Heading>}</ScoreContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  width: 170px;
  gap: 8px;
`;

const BadgeContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 21px;
`;

const ScoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const Score = styled.View`
  width: 50px;
  align-items: center;
  justify-content: center;
`;

const DividerContainer = styled.View`
  gap: 8px;
`;

const DividerPoint = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: #000000;
`;

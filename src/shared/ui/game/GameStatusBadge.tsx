import {GameStatus} from '~/shared/mapper/exercise';
import {useToken} from '@gluestack-style/react';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';

interface GameStatusBadgeProps {
  status: keyof GameStatus;
}

const badgeOptionKey = {
  0: {background: '#f3e8ff', textColor: '#7e22ce', statusMessage: '대기중'},
  1: {background: '#e0e7ff', textColor: '#4338ca', statusMessage: '다음 게임'},
  2: {background: '#fef3c7', textColor: '#b45309', statusMessage: '진행중'},
  3: {background: '#fef3c7', textColor: '#b45309', statusMessage: '점수 기록 중'},
  4: {background: '#E5E5E5', textColor: '#525252', statusMessage: '완료'},
  5: {background: '#E5E5E5', textColor: '#525252', statusMessage: '기록'},
  6: {background: '#E5E5E5', textColor: '#525252', statusMessage: '게임 없음'},
};

export const GameStatusBadge = ({status}: GameStatusBadgeProps) => {
  const {background, textColor, statusMessage} = badgeOptionKey[status ? status : 0];
  const backgroundToken = useToken('colors', background as any);
  return (
    <StyledContainer background={backgroundToken}>
      <Text size={'xs'} bold={true} color={textColor}>
        {statusMessage}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{background: string}>`
  display: flex;
  width: 64px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${({background}) => background};
  border-radius: 10px;
`;

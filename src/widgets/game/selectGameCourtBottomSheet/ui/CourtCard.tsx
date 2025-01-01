import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {GameCourt} from '~/shared/mapper/exercise';

interface CourtCardProps extends GameCourt {
  onSelectCourt?: () => void;
  onCloseBottom?: () => void;
}

export const CourtCard = (props: CourtCardProps) => {
  function pressEvent() {
    props.onSelectCourt && props.onSelectCourt();
    props.onCloseBottom && props.onCloseBottom();
  }

  return (
    <StyledContainer onPress={pressEvent}>
      <Text size={'sm'} bold>{`${props.courtNumber} 번 코트`}</Text>
      {props.isProgress && (
        <Badge action={'success'}>
          <BadgeText size={'xs'}>사용중</BadgeText>
        </Badge>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 64px;
  gap: 6px;
  margin-bottom: 18px;
  background: #ededed;
  border-radius: 8px;
`;

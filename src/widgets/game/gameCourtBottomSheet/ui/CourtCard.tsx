import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {GameCourt} from '~/shared/mapper/exercise';
import {Badge, BadgeText, CloseIcon, Icon, Text} from '@gluestack-ui/themed';
import {useFetchDeleteGameCourt} from '../model/useFetchDeleteGameCourt';

interface CourtCardProps extends GameCourt {
  onSelectCourt?: () => void;
  onCloseBottom?: () => void;
}

export const CourtCard = (props: CourtCardProps) => {
  const {isPendingDelCourt, deleteGameCourt} = useFetchDeleteGameCourt(props.courtId);
  const deleteColor = useToken('colors', 'orange600');

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
      <StyledPressDelete onPress={deleteGameCourt} background={deleteColor}>
        <Icon as={CloseIcon} color={'$textLight0'} />
      </StyledPressDelete>
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

const StyledPressDelete = styled.Pressable<{background: string}>`
  position: absolute;
  background-color: ${({background}) => background};
  justify-content: center;
  align-items: center;
  top: -8px;
  right: -8px;
  border-radius: 12px;
  height: 24px;
  width: 24px;
`;

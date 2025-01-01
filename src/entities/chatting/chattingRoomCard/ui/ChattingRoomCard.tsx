import styled from 'styled-components/native';
import {ChattingRoom} from '~/shared/mapper/chatting';
import {ChattingBadge} from '../ui/ChattingBadge.tsx';
import {Avatar, AvatarFallbackText, AvatarImage, Heading, Text} from '@gluestack-ui/themed';
import {chatFormatTimeDifference} from '~/shared/utils';
import {Hamburger} from '~/shared/ui';
import {ChattingBottomSheet} from '~/features/chatting/chattingBottomSheet';
// import {CustomBottomSheetModalMethods} from '~/features/chatting/chattingBottomSheet/ui/ChattingBottomSheet.tsx';
import {useBottomSheetController} from '~/shared/bottomSheet';

interface UnreadBadgeProps {
  text: number;
}

interface ChattingRoomCard extends ChattingRoom {
  onPress: () => void;
}

const UnreadBadge = ({text}: UnreadBadgeProps) => {
  return (
    <UnreadTextContainer>
      <UnreadText>{`${text}`}</UnreadText>
    </UnreadTextContainer>
  );
};

export const ChattingRoomCard = (props: ChattingRoomCard) => {
  const timePeriod = chatFormatTimeDifference(props.lastSendTime);
  const roomTitle = props.chatRoomName;

  // const bottomSheetModalRef = useRef<CustomBottomSheetModalMethods>(null);
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  return (
    <StyledContainer onPress={props.onPress}>
      <Avatar>
        <AvatarFallbackText>{props.chatRoomName}</AvatarFallbackText>
        {props.thumbnail && <AvatarImage source={{uri: props.thumbnail}} alt={'프로필 사진'} />}
      </Avatar>
      <StyledContents>
        <StyledHeaderContainer>
          <StyledTitleContainer>
            <ChattingBadge type={props.chatRoomType} />
            <Heading size={'xs'} numberOfLines={1} ellipsizeMode={'tail'}>
              {roomTitle}
            </Heading>
          </StyledTitleContainer>
          <Text size={'xs'}>{timePeriod}</Text>
        </StyledHeaderContainer>
        <StyledBottomContainer>
          <MessageText numberOfLines={1} ellipsizeMode="tail">
            {props.lastMessage}
          </MessageText>
          {props.unreadCount === 0 ? null : <UnreadBadge text={props.unreadCount} />}
        </StyledBottomContainer>
      </StyledContents>
      <Hamburger onPress={openBottomSheet} />
      <ChattingBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} chatRoomId={props.chatRoomId} />
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 10px 10px 20px;
`;

const StyledContents = styled.View`
  flex: 1;
  gap: 3px;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const StyledTitleContainer = styled.View`
  gap: 8px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
`;

const StyledBottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex: 1;
`;
const MessageText = styled.Text`
  flex: 1;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  color: gray;
`;

const UnreadTextContainer = styled.View`
  padding: 0 10px;
  background-color: #f97316 !important;
  border-radius: 20px;
`;

const UnreadText = styled.Text`
  font-size: 12px;
  color: white;
`;

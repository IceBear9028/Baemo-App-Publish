import styled from 'styled-components/native';
import {MyFriendList} from '~/shared/mapper/chatting';
import {Heading, Text} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {FriendBlockMenu, UnblockFriendMenu} from '~/entities/profile/ui/FriendBlockMenu.tsx';
import {CustomAvatar} from '~/shared/ui';

interface FriendCardProps extends MyFriendList {
  onPress?: () => void;
  isMyFriend: boolean;
}

export const ChattingFriendCard = (props: FriendCardProps) => {
  const {navigateUserProfile} = useMainNavigate();
  const {userProfileUrl, userDescription, userName, userId, relationId, isMyFriend} = props;
  return (
    <StyledPressContainer onPress={() => navigateUserProfile({userId: userId, chat: false})}>
      <CustomAvatar name={userName} profileImage={userProfileUrl} />
      <StyledContents>
        <StyledHeaderContainer>
          <StyledCBadgeContainer>
            <Heading size={'sm'} numberOfLines={1}>
              {userName}
            </Heading>
          </StyledCBadgeContainer>
        </StyledHeaderContainer>
        <Text size={'sm'}>{userDescription}</Text>
      </StyledContents>
      {isMyFriend ? <FriendBlockMenu userId={userId} /> : <UnblockFriendMenu relationId={relationId} />}
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 16px;
`;

const StyledContents = styled.View`
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCBadgeContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

import styled from 'styled-components/native';
import {MyFriendList} from '~/shared/mapper/chatting';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {CustomAvatar} from '~/shared/ui';
import {AddFriendButton} from '~/features/chatting/followFriend/ui/AddFriendButton.tsx';
import {ApproveFriendButton, RefuseFriendButton} from '~/features/profile/myRequestFriendList/ui/RequestFriendButton.tsx';

interface FriendCardProps extends MyFriendList {
  onPress?: () => void;
}

export const RequestFriendCard = (props: FriendCardProps) => {
  const {navigateUserProfile} = useMainNavigate();
  const {userProfileUrl, userDescription, userName, userId, relationId} = props;
  return (
    <StyledPressContainer onPress={() => navigateUserProfile({userId: userId, chat: false})}>
      {/*<CustomAvatar name={'안녕하세용'} profileImage={userProfileUrl} />*/}
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
      <ApproveFriendButton targetId={userId} />
      <RefuseFriendButton targetId={userId} />
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

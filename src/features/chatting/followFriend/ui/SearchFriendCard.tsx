import {View} from 'react-native';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {CustomAvatar, LoadingPageSpinner} from '~/shared/ui';
import {AddFriendButton} from '../ui/AddFriendButton.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface FriendDto {
  userId: number;
  userName: string;
  userProfileUrl: string;
  userDescription: string;
}

interface FollowFriendCardProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export const SearchFriendCard = ({data, isLoading, error}: FollowFriendCardProps) => {
  const queryClient = new QueryClient();

  if (isLoading) {
    return <LoadingPageSpinner />;
  }
  if (error) {
    return <Text />;
  }
  return (
    <View>
      {data &&
        data.map((user: FriendDto) => (
          <StyledContainer key={user.userId}>
            <CustomAvatar name={user.userName} profileImage={user.userProfileUrl} />
            <StyledContents>
              <StyledHeaderContainer>
                <StyledCBadgeContainer>
                  <Heading size={'sm'} numberOfLines={1}>
                    {user.userName}
                  </Heading>
                </StyledCBadgeContainer>
              </StyledHeaderContainer>
              {user.userDescription && <Text size={'sm'}>{user.userDescription}</Text>}
            </StyledContents>
            {/*뭐가 문제인건지 모르겟음....*/}
            <QueryClientProvider client={queryClient}>
              <AddFriendButton targetId={user.userId} text={'추가'} />
            </QueryClientProvider>
          </StyledContainer>
        ))}
    </View>
  );
};

const StyledContainer = styled.View`
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

import React from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {useFetchGetUserProfile} from '../model/useFetchGetUserProfile.ts';
import {AddFriendButton, DisableFriendButton} from '~/features/chatting/followFriend/ui/AddFriendButton.tsx';
import {useMyProfileStore} from '~/shared/authentication';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';
import {FriendRequest} from '~/shared/mapper/userProfile';
import {CustomAvatar, LoadingSpinner} from '~/shared/ui';

interface UserIdProps {
  userId: number;
}
export const UserProfileCard = ({userId}: UserIdProps) => {
  const {isError, isFetching, userProfileData} = useFetchGetUserProfile(userId);
  const myUserId = useMyProfileStore(store => store.userId);
  const status = userProfileData?.friendRequestStatus || 'NOT_REQUESTED';
  const buttonText = FriendRequest.convertText(status);
  console.log('userProfile', userProfileData);

  if (isFetching) {
    return (
      <StyledFallbackContainer>
        <LoadingSpinner size={'sm'} />
      </StyledFallbackContainer>
    );
  }

  if (isError) {
    return (
      <StyledFallbackContainer>
        <Text>에러 발생</Text>
      </StyledFallbackContainer>
    );
  }

  return (
    <StyledContainer>
      {userProfileData && (
        <StyledInfoContainer>
          <CustomAvatar size={'lg'} name={userProfileData.realName} profileImage={userProfileData.profileUrl} />
          <StyledTextGroup>
            <StyledTextHeader>
              <StyledBadgeContainer>
                <Heading>{userProfileData.realName}</Heading>
                <PlayerLevelBadge gender={userProfileData.gender} playerLevel={userProfileData.level} />
              </StyledBadgeContainer>
              {myUserId === userProfileData.userId ||
              status === 'RECEIVER_PENDING' ||
              status === 'SENDER_PENDING' ||
              status === 'CONFIRMED' ? (
                <DisableFriendButton text={buttonText} />
              ) : (
                <AddFriendButton targetId={userId} text={buttonText} />
              )}
            </StyledTextHeader>
            <Text size={'xs'}>{userProfileData.description}</Text>
          </StyledTextGroup>
        </StyledInfoContainer>
      )}
    </StyledContainer>
  );
};

const StyledFallbackContainer = styled.View`
  padding: 36px 20px;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.View`
  padding: 0px 20px;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const StyledTextGroup = styled.View`
  flex: 1;
  gap: 5px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledTextHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

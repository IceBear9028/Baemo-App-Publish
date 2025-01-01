import styled from 'styled-components/native';
import {HeaderNotificationButton, HeaderSettingButton} from '~/shared/ui';
import {useMainNavigate} from '~/shared/route';
import React from 'react';
import {HeaderFollowFriendButton} from '~/features/profile/myProfileCard';

export const ProfileHeaderButtonGroup = () => {
  const {navigateSettingPage, navigateNotificationPage} = useMainNavigate();
  return (
    <StyledContainer>
      <HeaderFollowFriendButton />
      <HeaderNotificationButton onPress={navigateNotificationPage} />
      <HeaderSettingButton onPress={navigateSettingPage} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  padding-right: 16px;
`;

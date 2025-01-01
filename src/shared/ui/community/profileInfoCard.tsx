import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import {useMainNavigate} from '~/shared/route';
import {CustomAvatar} from '~/shared/ui';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';

interface ProfileInfoCardProps extends Pick<PlayerProfile, 'userId' | 'profileImage' | 'name'> {
  badge?: string;
  description?: string;
  avatarSize?: 'xs' | 'sm';
  children?: ReactNode;
  onPress?: () => void;
  showRealName?: boolean;
}

export const ProfileInfoCard = ({showRealName = true, avatarSize = 'sm', ...props}: ProfileInfoCardProps) => {
  const userId = props.userId;
  const {navigateUserProfile} = useMainNavigate();

  function navigateProfile() {
    if (userId) {
      navigateUserProfile({userId: userId, chat: false});
    }
  }

  return (
    <StyledContainer onPress={navigateProfile}>
      <CustomAvatar size={avatarSize} {...props} />
      <StyledContents>
        <StyledTextContainer>
          <StyledInfoContainer>
            <StyledNameContainer>
              <Text size={'sm'} bold={true} color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'}>
                {showRealName ? `${props.name}` : 'B'}
              </Text>
            </StyledNameContainer>
            {props.badge && (
              <Badge size={'sm'} action={'muted'}>
                <BadgeText>{props.badge}</BadgeText>
              </Badge>
            )}
            {props.description && (
              <React.Fragment>
                {/*여기에 Seperator 컴포넌트 추가*/}
                <Text color={'$textLight400'} size={'xs'}>
                  {props.description}
                </Text>
              </React.Fragment>
            )}
          </StyledInfoContainer>
        </StyledTextContainer>
        {props.children}
      </StyledContents>
    </StyledContainer>
  );
};

const StyledContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const StyledTextContainer = styled.View`
  min-width: 50%;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const StyledNameContainer = styled.View`
  max-width: 80%;
`;

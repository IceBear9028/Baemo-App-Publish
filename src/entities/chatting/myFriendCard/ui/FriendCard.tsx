import styled from 'styled-components/native';
import {MyFriendList} from '~/shared/mapper/chatting';
import {CheckedButton, CheckButton} from '~/shared/ui';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import React from 'react';

interface FriendCardProps {
  friend: MyFriendList;
  isSelected: boolean;
  onSelect?: () => void;
}

export const FriendCard = ({friend, isSelected, onSelect}: FriendCardProps) => {
  return (
    <Card>
      <Avatar>
        <AvatarFallbackText>{friend.userName}</AvatarFallbackText>
        {friend.userProfileUrl && <AvatarImage source={{uri: friend.userProfileUrl}} alt={'프로필 사진'} />}
      </Avatar>
      <FriendInfo>
        <FriendName>{friend.userName}</FriendName>
        {friend.userDescription && <StatusMessage>{friend.userDescription}</StatusMessage>}
      </FriendInfo>
      {isSelected ? <CheckedButton onPress={onSelect} /> : <CheckButton onPress={onSelect} />}
    </Card>
  );
};

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #eee;
  padding: 10px 20px;
`;

const CheckBoxButton = styled.TouchableOpacity`
  padding: 20px 14px;
`;

// const Avatar = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   margin-right: 15px;
// `;

const FriendInfo = styled.View`
  flex: 1;
  margin-left: 10px;
  justify-content: center;
`;

const FriendName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

const StatusMessage = styled.Text`
  font-size: 12px;
  color: #666;
`;

const SelectIcon = styled.View`
  // Custom styles for the select icon
`;

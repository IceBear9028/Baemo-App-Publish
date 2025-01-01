import styled from 'styled-components/native';
import {Avatar, AvatarFallbackText, AvatarImage, Text} from '@gluestack-ui/themed';

interface MyMessageProps {
  user: {
    userId: number;
    userName: string;
    userThumbnail: string;
    role: string;
  };

  content: string;
  sendTime: string;
  unread: number;
}

export const MyMessage = ({user, content, sendTime, unread}: MyMessageProps) => {
  return (
    <StyledContainer>
      <Container>
        <StyledTextContainer>
          <Text size={'sm'}>{content}</Text>
        </StyledTextContainer>
        <Avatar size={'sm'}>
          <AvatarFallbackText>{user.userName}</AvatarFallbackText>
          {user.userThumbnail && <AvatarImage source={{uri: user.userThumbnail}} alt={'프로필 사진'} />}
        </Avatar>
      </Container>
      <StyledBottomContainer>
        <Text size={'xs'}>{sendTime}</Text>
        {/*{unread === 0 ? null : <Text size={'xs'} >{unread}</Text>}*/}
      </StyledBottomContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: column;
  align-items: flex-end;
  padding: 5px 10px;
  margin-bottom: 20px;
`;

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
`;
const StyledTextContainer = styled.View`
  padding: 7px 10px;
  background: #ecfdf5;
  border-radius: 6px;
  color: black;
  margin-left: 50px;
  flex-shrink: 1;
`;

const StyledBottomContainer = styled.View`
  flex-direction: row;
  margin: 0 40px;
  gap: 12px;
`;

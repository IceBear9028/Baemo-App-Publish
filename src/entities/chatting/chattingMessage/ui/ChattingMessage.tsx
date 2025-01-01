import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Heading, Text} from '@gluestack-ui/themed';
import {MemberStatusBadge} from '~/shared/ui/chatting/MemberStatusBadge.tsx';
import {useMainNavigate} from '~/shared/route';
import {CustomAvatar} from '~/shared/ui';

interface ChattingMessageProps {
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

export const ChattingMessage = ({user, content, sendTime, unread}: ChattingMessageProps) => {
  const {navigateUserProfile} = useMainNavigate();
  const textBackground = useToken('colors', 'trueGray50');
  return (
    <StyledContainer>
      <StyledProfile onPress={() => navigateUserProfile({userId: user.userId, chat: true})}>
        <CustomAvatar size={'sm'} name={user.userName} profileImage={user.userThumbnail} />
        <Heading size={'sm'}>{user.userName}</Heading>
        <MemberStatusBadge status={user.role} />
      </StyledProfile>
      <StyledTextContainer bgColor={textBackground}>
        <Text size={'sm'}>{content}</Text>
      </StyledTextContainer>
      <StyledBottomContainer>
        <Text size={'xs'}>{sendTime}</Text>
        {/*{unread === 0 ? null : <Text size={'xs'}>{unread}</Text>}*/}
      </StyledBottomContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 10px;
  margin-bottom: 20px;
`;

const StyledProfile = styled.TouchableOpacity`
  flex-direction: row;
  gap: 8px;
`;

// const UserInfoContainer = styled.View`
//     flex-direction: row;
//   align-items: center;
// `;

const StyledTextContainer = styled.View<{bgColor: string}>`
  margin: 5px 40px 0 40px;
  padding: 7px 10px;
  background: ${({bgColor}) => bgColor};
  border-radius: 6px;
  color: black;
  flex-shrink: 1;
`;

const StyledBottomContainer = styled.View`
  flex-direction: row;
  margin: 0 40px;
  gap: 12px;
`;

// import styled from 'styled-components/native';
// import {FlatList} from '@gluestack-ui/themed';
// import {MyMessage, ChattingMessage, DateSeparator} from '~/entities/chatting/chattingMessage';
// import {UserMessage} from '~/shared/mapper/chatting';
//
// interface Message {
//   messages: {
//     userInfoDto: {
//       userId: number;
//       userName: string;
//       userThumbnail: string;
//       role: string;
//     };
//     messageInfoDto: {
//       message: string;
//       sendTime: string;
//       sendDate: string;
//       unreadCount: number;
//       isUserMessage: boolean;
//     };
//   };
// }
//
// interface MessageListProps {
//   messages: Message[];
// }
//
// export const MessageList = ({messages}: MessageListProps) => {
//   return (
//     <FlatList
//       data={messages}
//       renderItem={({item, index}) => {
//         const showDateSeparator = index === 0 || item.messageInfoDto.sendDate !== messages[index - 1].messageInfoDto.sendDate;
//
//         return (
//           <StyledContainer>
//             {showDateSeparator && <DateSeparator date={item.messageInfoDto.sendDate} />}
//             {item.messageInfoDto.isUserMessage === true ? (
//               <MyMessage
//                 key={index}
//                 user={item.userInfoDto}
//                 content={item.messageInfoDto.message}
//                 sendTime={item.messageInfoDto.sendTime}
//                 unread={item.messageInfoDto.unreadCount}
//               />
//             ) : (
//               <ChattingMessage
//                 key={index}
//                 user={item.userInfoDto}
//                 content={item.messageInfoDto.message}
//                 sendTime={item.messageInfoDto.sendTime}
//                 unread={item.messageInfoDto.unreadCount}
//               />
//             )}
//           </StyledContainer>
//         );
//       }}
//       keyExtractor={(item, index) => `${item.messageInfoDto.sendTime}-${index}`}
//     />
//   );
// };
// const StyledContainer = styled.View`
//   flex: 1;
// `;

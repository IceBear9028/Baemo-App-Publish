import styled from 'styled-components/native';
import {Platform, ScrollView} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {SafeAreaView, Text} from '@gluestack-ui/themed';
import {useChattingMessages} from '..//model/useChattingMessage.tsx';
import {LoadingPageSpinner} from '~/shared/ui';
import {MessageInput} from '~/widgets/chatting/chattingRoom';
import {UserMessage} from '~/shared/mapper/chatting';
import {useMyProfileStore} from '~/shared/authentication';
import {getToken} from '~/shared/authentication/lib/settingToken.ts';
import {ChattingMessage, DateSeparator, MyMessage} from '~/entities/chatting/chattingMessage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as StompJs from '@stomp/stompjs';
import {TextEncoder} from 'text-encoding';
import {BaemoBaseUrl} from '~/shared/fetch';

// @ts-ignore
global.TextEncoder = TextEncoder;

interface Message extends UserMessage {}

type DetailChattingRoomPageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'detailChattingRoomPage'>;
export const DetailChattingRoomPage = ({route}: DetailChattingRoomPageProps) => {
  const {chatRoomId, chatRoomName} = route.params;
  const isEditable = chatRoomName !== '탈퇴한 사용자';
  const myUserId = useMyProfileStore(store => store.userId);
  const baseURL = BaemoBaseUrl?.split('//')[1];

  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView | null>(null);
  // const [pageNumber] = useState<number>(1);
  // const [pageSize] = useState<number>(200);

  const client = useRef<StompJs.Client | null>(null);
  const API_BASE_URL = `wss://${baseURL}api/chat/event/connection`;
  const roomHash = chatRoomId; //본인 채팅방 roomId

  //채팅 내용 불러옴
  const {isLoading, isError, data} = useChattingMessages(chatRoomId);
  const connectSocket = useCallback(async () => {
    try {
      let extractedToken = '';
      const {token} = await getToken();
      if (token && token.authorization) {
        extractedToken = token.authorization.split(' ')[1];
      } else {
        console.log('토큰이 없음');
        return;
      }

      client.current = new StompJs.Client({
        brokerURL: `${API_BASE_URL}`,
        connectHeaders: {
          Authorization: `${extractedToken}`,
        },
        debug: (str: string) => {
          console.log(str);
        },

        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,

        onConnect: () => {
          console.log('서버랑 연결됨');
          client.current?.subscribe(`/api/chat/event/subscribe/${roomHash}`, message => {
            const receivedMessage = JSON.parse(message.body);
            setMessages(preMessages => [...preMessages, receivedMessage]);
            scrollToEnd();
          });
        },
        onDisconnect: () => {
          console.log('disconnect');
        },
        onStompError: (frame: StompJs.IFrame) => {
          console.error('STOMP error:', frame);
        },
      });
      client.current.activate();
    } catch (error) {
      console.log('소켓연결에러', error);
    }
  }, []);

  const disconnectSocket = useCallback(() => {
    client.current?.deactivate();
    client.current = null;
    console.log('소켓연결해제');
  }, []);

  const handleSendMessage = (message: string) => {
    if (client.current && client.current.connected) {
      const newMessage = {
        content: message,
        roomId: `${roomHash}`,
        userId: myUserId,
      };
      client.current.publish({
        destination: `/api/chat/event/pub/${roomHash}`,
        body: JSON.stringify(newMessage),
      });

      console.log('보낸 메시지:', newMessage);
      scrollToEnd();
    } else {
      console.error('Client 연결 안됨 ');
    }
  };

  // const fetchChatHistory = useCallback(()=>{
  //   if (data) {
  //     const dataType = data as ChattingMessageResponse;
  //     const message = dataType.messages;
  //
  //     setMessages(prevMessages => [...prevMessages, ...message]);
  //
  //     // 스크롤을 마지막 메시지로 이동
  //     scrollToEnd();
  //   }
  // },[data]);
  //
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     fetchChatHistory();
  //     scrollToEnd();
  //   }
  // }, [data, isLoading, isError, fetchChatHistory]);
  useEffect(() => {
    if (data) {
      const message = data.messages;
      setMessages(message);
      scrollToEnd();
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     scrollViewRef.current?.scrollToEnd({animated: false});
  //   }
  // }, [messages]);
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: false});
    }, 100);
  };

  if (isError) {
    return <Text>채팅방내용조회안됨</Text>;
  }

  if (isLoading) {
    return <LoadingPageSpinner />;
  }

  return (
    // <StyledContainer>
    //   <StyledListContainer>
    //   <MessageList messages={messages} />
    // </StyledListContainer>
    //   <TextInput
    //     style={styles.input}
    //     value={inputMessage}
    //     onChangeText={setInputMessage}
    //     onSubmitEditing={sendMessage}
    //     placeholder="Type a message..."
    //   />
    //   <Button title="Send" onPress={sendMessage} />
    // </StyledContainer>
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <StyledChattingContainer>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: false})}
            keyboardShouldPersistTaps="handled">
            {messages.map((message, index) => {
              const showDateSeparator = index === 0 || message.messageInfoDto.sendDate !== messages[index - 1].messageInfoDto.sendDate;

              return (
                <Container>
                  {showDateSeparator && <DateSeparator date={message.messageInfoDto.sendDate} />}
                  {message.userInfoDto.userId === myUserId ? (
                    <MyMessage
                      key={index}
                      user={message.userInfoDto}
                      content={message.messageInfoDto.message}
                      sendTime={message.messageInfoDto.sendTime}
                      unread={message.messageInfoDto.unreadCount}
                    />
                  ) : (
                    <ChattingMessage
                      key={index}
                      user={message.userInfoDto}
                      content={message.messageInfoDto.message}
                      sendTime={message.messageInfoDto.sendTime}
                      unread={message.messageInfoDto.unreadCount}
                    />
                  )}
                </Container>
              );
            })}
          </ScrollView>
        </StyledChattingContainer>
        <MessageInput onSend={handleSendMessage} isEditable={isEditable} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledChattingContainer = styled.ScrollView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

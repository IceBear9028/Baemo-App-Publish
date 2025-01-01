export interface roomInfoDto {
  chatRoomId: string;
  numberOfUserInChatRoom: number;
}

export interface userInfoDto {
  userId: number;
  userName: string;
  userThumbnail: string;
  role: string;
}

export interface messageInfoDto {
  message: string;
  sendTime: string;
  sendDate: string;
  unreadCount: number;
  isUserMessage: boolean;
}

export interface UserMessage {
  userInfoDto: userInfoDto;
  messageInfoDto: messageInfoDto;
}

export interface ChattingMessageResponse {
  roomInfoDto: roomInfoDto;
  messages: UserMessage[];
}

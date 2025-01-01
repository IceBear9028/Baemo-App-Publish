export type ResponseChatRoomType = 'DM' | 'CLUB' | 'EXERCISE';

export type ChatRoomType = 'DM' | 'CLUB' | 'EXERCISE';

export interface ChatRoomInfoDto {
  chatRoomId: string;
  chatRoomName: string;
  chatRoomType: ResponseChatRoomType;
  thumbnail: string;
  memberCount: number;
}

export interface MessageDto {
  lastMessage: string;
  lastSendTime: string;
  unreadCount: number;
}

export interface ChattingRoomResponse {
  chatRoomInfoDto: ChatRoomInfoDto;
  messageDto: MessageDto;
}

export class ChattingRoom {
  chatRoomId: string;
  chatRoomName: string;
  chatRoomType: ChatRoomType;
  thumbnail: string;
  memberCount: number;
  lastMessage: string;
  lastSendTime: string;
  unreadCount: number;

  constructor(input: ChattingRoomResponse) {
    const chatRoomInfo = input.chatRoomInfoDto;
    const messageInfo = input.messageDto;

    this.chatRoomId = chatRoomInfo.chatRoomId;
    this.chatRoomName = chatRoomInfo.chatRoomName;
    this.chatRoomType = chatRoomInfo.chatRoomType;
    this.thumbnail = chatRoomInfo.thumbnail;
    this.memberCount = chatRoomInfo.memberCount;
    this.lastMessage = messageInfo.lastMessage;
    this.lastSendTime = messageInfo.lastSendTime;
    this.unreadCount = messageInfo.unreadCount;
  }
}


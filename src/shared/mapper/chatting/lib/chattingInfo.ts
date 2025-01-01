export type ChattingInfo = {
  chatRoomId: string;
  chatRoomName: string | undefined;
};

export interface CreateChattingRoomResponse {
  chatRoomId: string;
  isNewChatRoom: boolean;
}

export class CreateChattingRoom {
  chatRoomId: string;
  isNewChatRoom: boolean;

  constructor(response: CreateChattingRoomResponse) {
    this.chatRoomId = response.chatRoomId;
    this.isNewChatRoom = response.isNewChatRoom;
  }
}

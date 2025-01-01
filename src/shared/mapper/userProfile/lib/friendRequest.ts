export type FriendRequestResponse = 'RECEIVER_PENDING' | 'SENDER_PENDING' | 'CONFIRMED' | 'REJECTED' | 'NOT_REQUESTED';

export class FriendRequest {
  public RECEIVER_PENDING = 'RECEIVER_PENDING';
  public SENDER_PENDING = 'SENDER_PENDING';
  public CONFIRMED = 'CONFIRMED';
  public REJECTED = 'REJECTED';
  public NOT_REQUESTED = 'NOT_REQUESTED';

  static convertText(input: keyof FriendRequest) {
    switch (input) {
      case 'RECEIVER_PENDING':
        return '친구 요청중';
      case 'SENDER_PENDING':
        return '요청 대기중';
      case 'CONFIRMED':
        return '내 친구';
      default:
        return '친구 추가';
    }
  }
}

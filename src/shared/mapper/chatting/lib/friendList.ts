export interface MyFriendListResponse {
  relationId: number;
  userId: number;
  userName: string;
  userProfileUrl: string;
  userDescription: string;
}

export class MyRequestFriendList {
  relationId: number;
  userId: number;
  userName: string;
  userProfileUrl: string;
  userDescription: string;
  constructor(props: MyFriendListResponse) {
    this.relationId = props.relationId;
    this.userId = props.userId;
    this.userName = props.userName;
    this.userProfileUrl = props.userProfileUrl;
    this.userDescription = props.userDescription;
  }
}

export class MyFriendList {
  relationId: number;
  userId: number;
  userName: string;
  userProfileUrl: string;
  userDescription: string;
  constructor(props: MyFriendListResponse) {
    this.relationId = props.relationId;
    this.userId = props.userId;
    this.userName = props.userName;
    this.userProfileUrl = props.userProfileUrl;
    this.userDescription = props.userDescription;
  }
}

export class MyBlockFriendList {
  relationId: number;
  userId: number;
  userName: string;
  userProfileUrl: string;
  userDescription: string;
  constructor(props: MyFriendListResponse) {
    this.relationId = props.relationId;
    this.userId = props.userId;
    this.userName = props.userName;
    this.userProfileUrl = props.userProfileUrl;
    this.userDescription = props.userDescription;
  }
}

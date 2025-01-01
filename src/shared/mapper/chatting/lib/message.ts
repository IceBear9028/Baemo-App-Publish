import {UserProfile, UserProfileResponse} from '~/shared/mapper/userProfile';

export interface ResponseMessage {
  chatType: 'text' | 'image';
  userProfile: UserProfileResponse;
  text: string;
  image: string;
  timeStamp: string;
}

export class Message {
  chatType: 'text' | 'image';
  userProfile: UserProfile;
  text: string;
  image: string;
  timeStamp: string;

  constructor(props: ResponseMessage) {
    this.chatType = props.chatType;
    this.userProfile = new UserProfile(props.userProfile);
    this.timeStamp = props.timeStamp;
    this.text = props.text;
    this.image = props.image;
  }
}

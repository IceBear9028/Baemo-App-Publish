export type NotificationDomainResponse = 'NOTICE' | 'CLUB' | 'CHAT' | 'EXERCISE' | 'MATCH';

export class NotificationDomain {
  NOTICE: string;
  CLUB: string;
  CHAT: string;
  EXERCISE: string;
  MATCH: string;
  constructor() {
    this.NOTICE = 'NOTICE';
    this.CLUB = 'CLUB';
    this.CHAT = 'CHAT';
    this.EXERCISE = 'EXERCISE';
    this.MATCH = 'MATCH';
  }
  static convert(input: NotificationDomainResponse) {
    switch (input) {
      case 'NOTICE':
        return 'NOTICE';
      case 'EXERCISE':
        return 'EXERCISE';
      case 'CHAT':
        return 'CHAT';
      case 'CLUB':
        return 'CLUB';
      case 'MATCH':
        return 'MATCH';
    }
  }
}

export interface NotificationResponse {
  id: number;
  domain: NotificationDomainResponse;
  domainId: number;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export class NotificationList {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
  createdDate: string;
  domain: keyof NotificationDomain;
  domainId: number;
  constructor(response: NotificationResponse) {
    this.id = response.id;
    this.title = response.title;
    this.body = response.body;
    this.isRead = response.isRead;
    this.createdDate = response.createdAt;
    this.domain = NotificationDomain.convert(response.domain);
    this.domainId = response.domainId;
  }
}

export interface Deeplink {
  domain?: keyof NotificationDomain;
  domainId: number;
}

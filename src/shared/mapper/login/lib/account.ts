import {maskName} from '~/shared/utils';

type AccountTypeResponse = 'BAEMO' | 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE' | 'NONE';
type AccountType = 'BAEMO' | 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE' | 'NONE';

export interface DuplicateAccountResponse {
  name: null | string;
  type: AccountTypeResponse;
}

export class DuplicateAccount {
  readonly phoneNumber: string;
  readonly name: string;
  readonly type: AccountType;
  constructor(input: DuplicateAccountResponse) {
    this.type = input.type;
    this.name = input.name ? maskName(input.name) : '';

    // 현재 없는 필드값들
    this.phoneNumber = '';
  }
}

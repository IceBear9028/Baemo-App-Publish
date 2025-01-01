export interface ValidTable {
  birth: boolean;
  name: boolean;
  password: boolean;
  oauth_id: boolean;
  agree_service_check: boolean;
}

export const INIT_VALID_TABLE: ValidTable = {
  birth: false,
  name: false,
  password: false,
  oauth_id: true, // 일반로그인 초기값 셋팅
  agree_service_check: false,
};

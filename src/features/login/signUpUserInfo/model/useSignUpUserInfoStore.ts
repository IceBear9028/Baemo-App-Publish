import {create} from 'zustand';
import {INIT_VALID_TABLE, ValidTable} from '~/features/login/signUpUserInfo/model/validTable.ts';
import {PlayerLevelResponse} from '~/shared/mapper/userProfile';

export type SignUpType = 'BAEMO' | 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';

export interface ReqDefaultSignUpUserInfo {
  phone: string;
  joinPassword: string;
  realName: string;
  birth: string | null; // format -> 2024-07-24
  level: SignUpUserInfo['level'];
  gender: SignUpUserInfo['gender'];
  requiredTerms: true;
}

export interface ReqSocialSignupUserInfo {
  joinType: SignUpType;
  oauth2Id: string;
  phone: string;
  realName: string;
  birth: string | null;
  level: SignUpUserInfo['level'];
  gender: SignUpUserInfo['gender'];
  requiredTerms: true;
}

export interface ReqEditProfile {
  description: string;
  nickName: string;
}

export interface SignUpUserInfo {
  phone: string;
  birth: string;
  name: string;
  nickName: string;
  description: string;
  password: string;
  gender: 'M' | 'F' | 'X';
  level: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'N' | null;
  type: SignUpType;
  oauth_id: string;
  agree_service_check: boolean;
}

interface SignUpUserInfoStore {
  store: SignUpUserInfo;
  validTable: ValidTable;
  isNotCheckBirth: boolean; // 생년월일 정보 허용
  setCheckBirth: (check: boolean) => void;
  setPhone: (phone: string) => void;
  setBirth: (birth: Date) => void;
  setName: (name: string) => void;
  setPassword: (pw: string) => void;
  setDescription: (desc: string) => void;
  setNickName: (nickName: string) => void;
  setLevel: (level: SignUpUserInfo['level']) => void;
  setGender: (gender: SignUpUserInfo['gender']) => void;
  setType: (signType: SignUpType) => void;
  setSocialInfo: (oauthId: string, type: SignUpType) => void;
  setServiceCheck: (agree: boolean) => void;
  resetStore: () => void;
  getReqSignUpUserInfo: () => ReqDefaultSignUpUserInfo;
  getReqSocialSignUpUserInfo: () => ReqSocialSignupUserInfo;
  getReqEditProfile: () => ReqEditProfile;
  isValidInfo: () => boolean;
  isValidSocialInfo: () => boolean;

  // valid 정보 업데이트 메소드
  setValidName: (isValid: boolean) => void;
  setValidPassword: (isValid: boolean) => void;
}

const INIT_USERINFO: SignUpUserInfo = {
  phone: '',
  birth: new Date().toISOString().split('T')[0],
  name: '',
  nickName: '',
  description: '',
  password: '',
  level: null,
  gender: 'M',
  type: 'BAEMO',
  oauth_id: '',
  agree_service_check: true,
};

export const useSignUpUserInfoStore = create<SignUpUserInfoStore>((set, get) => ({
  store: INIT_USERINFO,
  validTable: INIT_VALID_TABLE,
  isNotCheckBirth: true,
  getReqSignUpUserInfo: () => {
    const reqInfo = get().store;
    const birth = get().isNotCheckBirth ? null : reqInfo.birth;
    return {
      phone: reqInfo.phone,
      joinPassword: reqInfo.password,
      realName: reqInfo.name,
      birth: birth,
      level: reqInfo.level,
      gender: reqInfo.gender,
      requiredTerms: true,
    };
  },
  getReqSocialSignUpUserInfo: () => {
    const requestInfo = get().store;
    const resultBirth = get().isNotCheckBirth ? null : requestInfo.birth;
    return {
      joinType: requestInfo.type,
      oauth2Id: requestInfo.oauth_id,
      phone: requestInfo.phone,
      realName: requestInfo.name,
      birth: resultBirth,
      level: requestInfo.level,
      gender: requestInfo.gender,
      requiredTerms: true,
    };
  },
  getReqEditProfile: () => {
    const requestInfo = get().store;
    return {
      description: requestInfo.description,
      nickName: requestInfo.nickName,
    };
  },
  setCheckBirth: check => set(prev => ({...prev, isNotCheckBirth: check})),
  isValidInfo: () => {
    const isNotCheckBirth = get().isNotCheckBirth;
    const {oauth_id, birth, ...prevValidTable} = get().validTable;
    if (isNotCheckBirth) {
      return Object.entries(prevValidTable).every(([key, value]) => value);
    } else {
      return Object.entries({birth, ...prevValidTable}).every(([key, value]) => value);
    }
  },
  isValidSocialInfo: () => {
    // console.log('유효성 확인 ----> ', get().validTable);
    const isNotCheckBirth = get().isNotCheckBirth;
    const {password, birth, ...prevValidTable} = get().validTable;
    if (isNotCheckBirth) {
      return Object.entries(prevValidTable).every(([key, value]) => value);
    } else {
      return Object.entries({birth, ...prevValidTable}).every(([key, value]) => value);
    }
  },
  setPhone: phone =>
    set(prev => {
      const updateValidInfo = {...get().validTable, phone: !!phone};
      return {...prev, validTable: updateValidInfo, store: {...prev.store, phone: phone}};
    }),
  setBirth: birth =>
    set(prev => {
      const updateValidInfo = {...get().validTable, birth: !!birth};
      const birthToString = birth.toISOString().split('T')[0];
      return {...prev, validTable: updateValidInfo, store: {...prev.store, birth: birthToString}};
    }),
  setName: name => set(prev => ({...prev, store: {...prev.store, name: name}})),
  setValidName: isValid =>
    set(prev => {
      const updateValidInfo = {...get().validTable, name: isValid};
      return {...prev, validTable: updateValidInfo};
    }),
  setNickName: nickName => set(prev => ({...prev, store: {...prev.store, nickName}})),
  setValidPassword: isValid =>
    set(prev => {
      const updateValidInfo = {...get().validTable, password: isValid};
      return {...prev, validTable: updateValidInfo};
    }),
  setPassword: pw => set(prev => ({...prev, store: {...prev.store, password: pw}})),
  setLevel: level => set(prev => ({...prev, store: {...prev.store, level: level}})),
  setGender: gender => set(prev => ({...prev, store: {...prev.store, gender: gender}})),
  setDescription: desc => set(prev => ({...prev, store: {...prev.store, description: desc}})),
  setType: signType => set(prev => ({...prev, store: {...prev.store, type: signType}})),
  setSocialInfo: (authId, loginType) =>
    set(prev => {
      const isValidOAuthId = !!authId;
      const updateValidInfo: ValidTable = {...get().validTable, oauth_id: isValidOAuthId};
      return {...prev, validTable: updateValidInfo, store: {...prev.store, oauth_id: authId, type: loginType}};
    }),
  setServiceCheck: agree =>
    set(prev => {
      const updateValidInfo: ValidTable = {...get().validTable, agree_service_check: agree};
      return {...prev, validTable: updateValidInfo, store: {...prev.store, agree_service_check: agree}};
    }),
  resetStore: () => set(prev => ({...prev, store: INIT_USERINFO, validTable: INIT_VALID_TABLE})),
}));

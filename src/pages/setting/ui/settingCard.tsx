import React from 'react';
import {Alert} from 'react-native';
import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import FeedIcon from '~/shared/images/svg/setting-feed.svg';
import EmailIcon from '~/shared/images/svg/setting-email.svg';
import PhoneIcon from '~/shared/images/svg/setting-phone.svg';
import TermsIcon from '~/shared/images/svg/setting-terms.svg';
import LogoutIcon from '~/shared/images/svg/setting-logout.svg';
import PasswordIcon from '~/shared/images/svg/setting-password.svg';
import PersonalIcon from '~/shared/images/svg/setting-personal.svg';
import {fetchTestLogin} from '~/features/profile/testLoginButton';
import {useFetchLogout} from '~/features/login/fetchLogout';
import {useLoginNavigate, useMainNavigate} from '~/shared/route';
import {useAuthControl} from '~/shared/authentication';

interface SettingCardProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

const SettingCard = ({children, onPress}: SettingCardProps) => {
  return <StyledContainer onPress={onPress}>{children}</StyledContainer>;
};

export const FeedSettingCard = () => {
  return (
    <SettingCard>
      <FeedIcon />
      <Text size={'sm'}>피드 설정</Text>
    </SettingCard>
  );
};

export const LogoutSettingCard = () => {
  const {fetchLogout} = useFetchLogout();
  function openAlertEvent() {
    Alert.alert('로그아웃을 할까요?', '', [
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          fetchLogout();
        },
        style: 'destructive',
      },
    ]);
  }
  return (
    <SettingCard onPress={openAlertEvent}>
      <LogoutIcon />
      <Text size={'sm'}>로그아웃</Text>
    </SettingCard>
  );
};

export const PasswordSettingCard = () => {
  return (
    <SettingCard onPress={fetchTestLogin}>
      <PasswordIcon />
      <Text size={'sm'}>비밀번호 변경</Text>
    </SettingCard>
  );
};

export const EmailSettingCard = () => {
  return (
    <SettingCard>
      <EmailIcon />
      <Text size={'sm'}>이메일주소 변경</Text>
    </SettingCard>
  );
};

export const PhoneSettingCard = () => {
  return (
    <SettingCard>
      <PhoneIcon />
      <Text size={'sm'}>핸드폰 번호 변경</Text>
    </SettingCard>
  );
};

export const PersonalSettingCard = () => {
  return (
    <SettingCard>
      <PersonalIcon />
      <Text size={'sm'}>개인정보보호 처리방침</Text>
    </SettingCard>
  );
};

export const TermsSettingCard = () => {
  const {navigateTermsOfServiceWebView} = useMainNavigate();
  return (
    <SettingCard
      onPress={() => navigateTermsOfServiceWebView('https://guiltless-cloud-514.notion.site/b6644414f692496c8ca536a8be4bf720?pvs=4')}>
      <TermsIcon />
      <Text size={'sm'}>이용 약관</Text>
    </SettingCard>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 13px;
  padding: 12px 20px;
`;

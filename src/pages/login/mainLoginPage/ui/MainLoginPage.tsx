import React, {Fragment} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Button, ButtonText, Heading, SafeAreaView, Text} from '@gluestack-ui/themed';
import {useLoginNavigate} from '~/shared/route';
import {KakaoLoginButton} from 'widgets/login/kakaoLoginButton';
import {AppleLoginButton} from 'widgets/login/appleLoginButton';
import {NaverLoginButton} from 'widgets/login/naverLoginButton';
import MainIllust from '~/shared/images/svg/BaemoIllust.svg';

const Header = () => {
  const backgroundColor = useToken('colors', 'primary500');
  return (
    <HeaderContainer bgColor={backgroundColor}>
      <TitleContainer>
        <Heading size={'4xl'} color={'$white'} bold={true}>
          BAEMO
        </Heading>
        <Text size={'xl'} color={'$white'} bold={true}>
          {'배드민턴의 모든 것\n배모에서 한번에 확인하세요.'}
        </Text>
      </TitleContainer>
      <RenderIconContainer>
        <MainIllust height={220} width={220} />
      </RenderIconContainer>
    </HeaderContainer>
  );
};

export const MainLoginPage = () => {
  const {navigateSignup, navigateFindPassword, navigatePasswordLogin} = useLoginNavigate();
  const backgroundColor = useToken('colors', 'primary500');
  const platform = Platform.OS;
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <BottomContainer>
          <StyledLoginButtonContainer>
            <SocialButtonGroups>
              <NaverLoginButton />
              <KakaoLoginButton />
              {/* 네이버 카카오 파일구조 참고 */}
              {platform === 'ios' && <AppleLoginButton />}
            </SocialButtonGroups>
            <Button size="sm" variant="link" onPress={navigatePasswordLogin} action={'secondary'}>
              <ButtonText>전화번호로 로그인하기</ButtonText>
            </Button>
          </StyledLoginButtonContainer>
          <StyledBottomButtonGroup>
            <StyledButtonContainer direction={'end'}>
              <Button size="sm" variant="link" onPress={navigateSignup}>
                <ButtonText>전화번호로 가입</ButtonText>
              </Button>
            </StyledButtonContainer>
            <StyledDivider />
            <StyledButtonContainer direction={'start'}>
              <Button size="sm" variant="link" onPress={navigateFindPassword}>
                <ButtonText>비밀번호 찾기</ButtonText>
              </Button>
            </StyledButtonContainer>
          </StyledBottomButtonGroup>
        </BottomContainer>
      </SafeAreaView>
    </Fragment>
  );
};

const HeaderContainer = styled.View<{bgColor: string}>`
  flex: 1;
  padding: 0 20px 0 20px;
  justify-content: flex-end;
  gap: 48px;
  background: ${({bgColor}) => bgColor};
`;

const TitleContainer = styled.View``;

const RenderIconContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 30px;
`;

/** Bottom 관련 스타일 **/

const BottomContainer = styled.View`
  flex-direction: column;
  padding: 50px 0 30px 0;
  background: white;
  gap: 30px;
  border-radius: 20px;
`;

const StyledBottomButtonGroup = styled.View`
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;

const StyledDivider = styled.View`
  width: 1px;
  height: 20px;
  background: #9ca3af;
`;

const StyledButtonContainer = styled.View<{direction: 'start' | 'end'}>`
  flex: 1;
  justify-content: center;
  align-items: ${({direction}) => `flex-${direction}`};
`;

const StyledLoginButtonContainer = styled.View`
  gap: 12px;
`;

const SocialButtonGroups = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 22px;
`;

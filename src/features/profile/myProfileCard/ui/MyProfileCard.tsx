import React from 'react';
import styled from 'styled-components/native';
import {useFetchGetMyProfile} from '../model/useFetchGetMyProfile.ts';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import {PlayerLevelBadge} from '~/shared/ui/common/PlayerLevelBadge.tsx';
import {useMainNavigate} from '~/shared/route';
import {CustomAvatar} from '~/shared/ui';

export const MyProfileCard = () => {
  const {navigateEditProfile} = useMainNavigate();
  const {isError, data} = useFetchGetMyProfile();

  // if (isFetching) {
  //   return <Text>로딩중</Text>;
  // }
  console.log('유저아이디 확인', data);
  if (isError) {
    return <Text>에러 발생</Text>;
  }

  return (
    <StyledContainer>
      {data && (
        <StyledInfoContainer>
          <CustomAvatar size={'xl'} profileImage={data.profileUrl} name={data.realName} />
          <StyledTextGroup>
            <StyledTextHeader>
              <StyledNameContainer>
                <Heading>{data.realName}</Heading>
                <Heading size={'md'} style={{color: '#78716C'}}>
                  #{data.baemoCode}
                </Heading>
              </StyledNameContainer>
            </StyledTextHeader>
            <StyledNameContainer>
              <PlayerLevelBadge gender={data.gender} playerLevel={data.level} />
              {/*<Text size={'sm'}>{data.nickName}</Text>*/}
            </StyledNameContainer>
            <Text size={'xs'}>{data.description}</Text>
          </StyledTextGroup>
        </StyledInfoContainer>
      )}
      <Button variant={'outline'} onPress={() => data && navigateEditProfile(data)}>
        <ButtonText size={'sm'}>프로필 편집</ButtonText>
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 14px 20px;
  gap: 24px;
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

const StyledTextGroup = styled.View`
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;
const StyledNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
`;

const StyledTextHeader = styled.View`
  gap: 4px;
`;

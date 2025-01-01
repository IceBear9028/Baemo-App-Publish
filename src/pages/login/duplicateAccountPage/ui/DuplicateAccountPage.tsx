import React from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CategoryCard} from '~/pages/login/duplicateAccountPage/ui/CategoryCard.tsx';
import {RootLoginStackParamList, useLoginNavigate} from '~/shared/route';

interface DuplicateAccountPageProps extends NativeStackScreenProps<RootLoginStackParamList, 'duplicateAccountPage'> {}

export const DuplicateAccountPage = ({route}: DuplicateAccountPageProps) => {
  const {navigateLogin} = useLoginNavigate();
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Heading color={'$primary500'} size={'2xl'}>
          가입된 계정
        </Heading>
        <StyledSubHeader>
          <Text color={'$textLight600'}>{'이미 가입된 계정이 있어요.'}</Text>
          <Text color={'$textLight600'}>{'아래 계정으로 로그인해주세요.'}</Text>
        </StyledSubHeader>
      </StyledHeaderContainer>
      <StyledBody>
        <CategoryCard {...route.params} onPress={navigateLogin} />
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: space-between;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledSubHeader = styled.View`
  gap: 4px;
`;

const StyledBody = styled.View`
  flex: 1;
  padding-right: 20px;
  padding-left: 20px;
  justify-content: space-between;
`;

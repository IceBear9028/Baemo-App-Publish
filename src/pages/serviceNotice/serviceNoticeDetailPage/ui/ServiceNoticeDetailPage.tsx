import styled from 'styled-components/native';
import React, {RefreshControl} from 'react-native';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRefreshNoticeArticle} from '../model/useRefreshNoticeArticle.ts';
import {ServiceNoticeArticleContents} from '~/widgets/serviceNotice/serviceNoticeArticleContents';
import {SafeAreaView} from '@gluestack-ui/themed';

interface ServiceNoticeDetailPage extends NativeStackScreenProps<RootMainStackParamList, 'serviceNoticeDetailPage'> {}

export const ServiceNoticeDetailPage = ({route}: ServiceNoticeDetailPage) => {
  const {isFetching, refreshNotice} = useRefreshNoticeArticle();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StyledScrollContainer overScrollMode="never" refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshNotice} />}>
        <ServiceNoticeArticleContents {...route.params} />
      </StyledScrollContainer>
    </SafeAreaView>
  );
};

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
  gap: 14px;
`;

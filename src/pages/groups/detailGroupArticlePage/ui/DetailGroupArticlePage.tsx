import React from 'react';
import styled from 'styled-components/native';
import {Platform, RefreshControl} from 'react-native';
import {FeatureDivider} from '~/shared/ui';
import {SafeAreaView} from '@gluestack-ui/themed';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {GroupArticleContents} from '~/features/groups/groupArticleContents';
import {GroupCommentCardList} from '~/features/groups/groupCommentCardList';
import {GroupCommentWriteForm} from '~/features/groups/groupCommentWriteForm';
import {useRefreshGroupArticle} from '~/pages/groups/detailGroupArticlePage/model/useRefreshGroupArticle.ts';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';

type DetailGroupArticlePageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'detailGroupArticlePage'>;

export const DetailGroupArticlePage = ({route}: DetailGroupArticlePageProps) => {
  const {groupsId, id} = route.params;
  const {refreshComment, isFetching} = useRefreshGroupArticle(groupsId, id);
  return (
    <ApiErrorBoundary>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100} style={{flex: 1}}>
          <StyledContainer>
            <StyledScrollContainer
              overScrollMode="never"
              refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refreshComment} />}>
              <GroupArticleContents {...route.params} />
              <FeatureDivider />
              <GroupCommentCardList {...route.params} />
            </StyledScrollContainer>
            <GroupCommentWriteForm {...route.params} />
          </StyledContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ApiErrorBoundary>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
  gap: 14px;
`;

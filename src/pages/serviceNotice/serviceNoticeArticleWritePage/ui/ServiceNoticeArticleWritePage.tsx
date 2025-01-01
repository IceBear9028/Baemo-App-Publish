import {useEffect} from 'react';
import styled from 'styled-components/native';
import {Keyboard, Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {ArticleContentInput, ArticleTitleInput} from '~/shared/input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {ArticleImagePicker, useArticleImageStore} from 'features/community/articleImagePicker';
import {detailNoticeQueryKey, ResServiceDetailNotice} from '~/widgets/serviceNotice/serviceNoticeArticleContents';
import {SafeAreaView} from '@gluestack-ui/themed';
import {ArticleBottomControl} from '~/widgets/community/articleBottomControl';

interface ServiceNoticeArticleWritePage extends NativeStackScreenProps<RootMainStackParamList, 'serviceNoticeArticleWritePage'> {}

export const ServiceNoticeArticleWritePage = ({route}: ServiceNoticeArticleWritePage) => {
  const {text, setText} = useArticleTextStore();
  const {title, setTitle} = useArticleTitleStore();
  const {initNoticeImages} = useArticleImageStore();

  const queryClient = useQueryClient();
  const notice = queryClient.getQueryData<ResServiceDetailNotice>([...detailNoticeQueryKey, route.params.id]);

  useEffect(() => {
    if (notice) {
      const articleInfo = notice.detailArticle;
      setTitle(articleInfo.title);
      setText(articleInfo.contentAll);
      initNoticeImages(articleInfo.imageAll.map(img => ({uri: img.path})));
    }
  }, [notice]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <StyledContainer>
          <ScrollView>
            <ArticleTitleInput value={title} onChange={setTitle} />
            <ArticleContentInput value={text} onChange={setText} limitLength={1000} />
          </ScrollView>
          <ArticleBottomControl statusType={'notice'} />
        </StyledContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

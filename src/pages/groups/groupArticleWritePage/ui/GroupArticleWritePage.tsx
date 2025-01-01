import {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {ScrollView, Platform} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SelectArticleStatus, useArticleStatusStore} from '~/features/community/selectArticleStatus';
import {useArticleImageStore} from 'features/community/articleImagePicker';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {ArticleContentInput, ArticleTitleInput} from '~/shared/input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {ResGroupDetailArticle} from '~/features/groups/groupArticleContents';
import {detailGroupArticleQueryKey} from '~/features/groups/groupArticleContents/model/useFetchGroupArticle.ts';
import {SafeAreaView} from '@gluestack-ui/themed';
import {ArticleBottomControl} from '~/widgets/community/articleBottomControl';

interface GroupArticleWritePageProps extends NativeStackScreenProps<RootMainStackParamList, 'groupArticleWritePage'> {}

export const GroupArticleWritePage = ({route}: GroupArticleWritePageProps) => {
  const {text, setText} = useArticleTextStore();
  const {title, setTitle} = useArticleTitleStore();
  const {initGroupImage} = useArticleImageStore();
  const {setGroupArticleStatus} = useArticleStatusStore();

  const {id} = route.params;
  const queryClient = useQueryClient();
  const detailArticle = queryClient.getQueryData<ResGroupDetailArticle>([...detailGroupArticleQueryKey, id]);

  useLayoutEffect(() => {
    if (detailArticle) {
      const articleInfo = detailArticle.article;
      setTitle(articleInfo.title);
      setText(articleInfo.contentAll);
      setGroupArticleStatus(articleInfo.status);
      setGroupArticleStatus(articleInfo.status);
      initGroupImage(articleInfo.imageAll.map(img => ({uri: img.path})));
    }
  }, [route.params.groupsId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
        <StyledContainer>
          <ScrollView>
            <SelectArticleStatus initArticleStatus={detailArticle?.article.status} statusType={'group'} />
            <ArticleTitleInput value={title} onChange={setTitle} />
            <ArticleContentInput value={text} onChange={setText} limitLength={1000} />
          </ScrollView>
          <ArticleBottomControl statusType={'group'} />
        </StyledContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

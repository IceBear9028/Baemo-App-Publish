import styled from 'styled-components/native';
import {SelectArticleStatus} from '~/features/community/selectArticleStatus';
import {Input, InputField, Textarea, TextareaInput} from '@gluestack-ui/themed';
import {useArticleTextStore} from '~/pages/community/communityArticleWritePage/model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '~/pages/community/communityArticleWritePage/model/useArticleTitleStore.ts';
import {useKeyboardHeight} from '~/shared/utils';
import {ArticleImagePicker} from 'features/community/articleImagePicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';

type DetailCategoryCommunityPageProps = {} & NativeStackScreenProps<RootMainStackParamList, 'communityArticleWritePage'>;

export const CommunityArticleWritePage = ({route}: DetailCategoryCommunityPageProps) => {
  const {text, setText} = useArticleTextStore();
  const {title, setTitle} = useArticleTitleStore();
  const keyboardHeight = useKeyboardHeight();

  return (
    <StyledContainer>
      <SelectArticleStatus initArticleStatus={route.params?.status} statusType={'community'} />
      <ArticleImagePicker statusType={'community'} />
      <StyledTitleCotainer>
        <Input size={'xl'} variant={'underlined'}>
          <InputField placeholder={'제목'} type={'text'} value={title} onChangeText={setTitle} />
        </Input>
      </StyledTitleCotainer>
      <StyledTextContainer marginBottom={keyboardHeight}>
        <Textarea style={{flex: 1, borderWidth: 0}}>
          <TextareaInput placeholder="나누고 싶은 생각을 적어주세요." value={text} onChangeText={setText} />
        </Textarea>
      </StyledTextContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledTitleCotainer = styled.View`
  padding: 10px 20px;
`;

const StyledTextContainer = styled.View<{marginBottom: number}>`
  flex: 1;
  padding: 10px 10px 30px 10px;
  margin-bottom: ${({marginBottom}) => `${marginBottom}px`};
`;

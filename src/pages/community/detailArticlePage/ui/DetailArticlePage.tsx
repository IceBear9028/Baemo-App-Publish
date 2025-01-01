import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {ArticleDetailContents} from '~/features/community/articleDetailContents';
import {ArticleCommentsButton, ArticleLikeButton, ProfileInfoCard} from '~/shared/ui';
import {formatTimeDifference} from '~/shared/utils';
import {FeatureDivider} from '~/shared/ui';
import ViewersIcon from '~/shared/images/svg/visibility.svg';
import {CommentCardList} from '~/features/community/commentCardList';
import {CommentWriteForm} from '~/features/community/commentWriteForm';

type DetailArticlePage = {} & NativeStackScreenProps<RootMainStackParamList, 'detailArticlePage'>;

export const DetailArticlePage = ({route}: DetailArticlePage) => {
  const {params} = route;
  const {author} = params;
  const diffTime = formatTimeDifference(params.createDate);
  return (
    <StyledContainer>
      <StyledScrollContainer overScrollMode="never">
        <StyledArticleContainer>
          <ProfileInfoCard description={diffTime} {...author} />
          <ArticleDetailContents {...route.params} />
        </StyledArticleContainer>
        <StyledStatusContainer>
          <StyledStatusInputGroups>
            <ArticleLikeButton likes={params.likes} />
            <ArticleCommentsButton comments={params.comments} />
          </StyledStatusInputGroups>
          <StyledViewerContainer>
            <ViewersIcon />
            <Text size={'xs'}>{params.views}</Text>
          </StyledViewerContainer>
        </StyledStatusContainer>
        <FeatureDivider />
        <CommentCardList />
      </StyledScrollContainer>
      <CommentWriteForm />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledScrollContainer = styled.ScrollView`
  flex: 1;
  gap: 14px;
`;

const StyledArticleContainer = styled.View`
  gap: 14px;
  padding: 10px 20px 20px 20px;
`;

const StyledStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px 30px 20px;
`;

const StyledStatusInputGroups = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const StyledViewerContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

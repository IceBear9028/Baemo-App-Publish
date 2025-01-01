import styled from 'styled-components/native';
import {ArticleCard} from '~/entities/community/articleCard';
import {ArticleCommentsButton, ArticleLikeButton} from '~/shared/ui';
import ViewersIcon from '~/shared/images/svg/visibility.svg';
import {Text} from '@gluestack-ui/themed';
import {Article} from '~/shared/mapper/community';
import {useToken} from '@gluestack-style/react';

interface CommunityArticleCardProps extends Omit<Article, ''> {
  onPress?: () => void;
}

export const CommunityArticleCard = (props: CommunityArticleCardProps) => {
  const borderColor = useToken('colors', 'borderLight100');
  const {likes, views, comments, onPress, ...ArticleProps} = props;
  return (
    <StyledContainer borderColor={borderColor}>
      <ArticleCard {...ArticleProps} onPress={onPress} />
      <StyledStatusContainer>
        <StyledStatusInputGroups>
          <ArticleLikeButton likes={likes} />
          <ArticleCommentsButton comments={comments} />
        </StyledStatusInputGroups>
        <StyledViewerContainer>
          <ViewersIcon />
          <Text size={'xs'}>{views}</Text>
        </StyledViewerContainer>
      </StyledStatusContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{borderColor: string}>`
  border-color: ${({borderColor}) => borderColor};
  border-bottom-width: 1px;
  padding-bottom: 14px;
`;

const StyledStatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {ArticleCommentsButton, ArticleLikeButton} from '~/shared/ui';
import {GroupArticle} from '~/shared/mapper/groups';
import ViewersIcon from '~/shared/images/svg/visibility.svg';
import {ArticleCard} from '~/entities/community/articleCard';
import {Groups} from '~/shared/mapper/groups';
import {useMainNavigate} from '~/shared/route';
import {GroupArticleAuthor} from '~/shared/mapper/userProfile';
import {formatTimeDifference} from '~/shared/utils';

interface GroupArticleCardProps extends GroupArticle, Pick<Groups, 'groupsId'> {
  onPress: () => void;
}

const AuthorInfo = (props: GroupArticleAuthor & Pick<GroupArticleCardProps, 'createDate'>) => {
  const {navigateUserProfile} = useMainNavigate();
  const diffTime = formatTimeDifference(props.createDate);
  return (
    <StyledProfileContainer onPress={() => navigateUserProfile({userId: props.userId, chat: false})}>
      <Text size={'xs'} color={'$textLight800'} bold>
        {props.name}
      </Text>
      <StyledDot />
      <Text size={'xs'} color={'$textLight400'}>
        {diffTime}
      </Text>
    </StyledProfileContainer>
  );
};

export const GroupArticleCard = (props: GroupArticleCardProps) => {
  const borderColor = useToken('colors', 'borderLight100');
  const {views, comments, onPress, ...ArticleProps} = props;
  const authorInfo = props.author;
  return (
    <StyledContainer>
      <ArticleCard {...ArticleProps} onPress={onPress} />
      <StyledBottomContainer borderColor={borderColor}>
        <AuthorInfo createDate={props.createDate} {...authorInfo} />
        <StyledStatusInputGroups>
          <StyledViewerContainer>
            <ViewersIcon width={18} height={18} />
            <Text size={'xs'}>{views}</Text>
          </StyledViewerContainer>
          <ArticleLikeButton likes={props.likes} />
          <ArticleCommentsButton comments={comments} />
        </StyledStatusInputGroups>
      </StyledBottomContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 14px 20px 0 20px;
  gap: 16px;
`;

const StyledBottomContainer = styled.View<{borderColor: string}>`
  border-color: ${({borderColor}) => borderColor};
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 14px;
`;

const StyledProfileContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledDot = styled.View`
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background: #d3d3d3;
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

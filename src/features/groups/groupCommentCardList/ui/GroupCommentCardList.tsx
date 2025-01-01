import {Fragment} from 'react';
import styled from 'styled-components/native';
import {Heading, Text} from '@gluestack-ui/themed';
import {LoadingPageSpinner} from '~/shared/ui';
import {GroupArticle, Groups} from '~/shared/mapper/groups';
import {useFetchGetCommendList} from '../model/useFetchGetCommendList.ts';
import {GroupCommentCard} from '~/features/groups/groupCommentCardList/ui/GroupCommentCard.tsx';

interface GroupCommentCardListProps extends Pick<GroupArticle, 'id'>, Pick<Groups, 'groupsId'> {}

export const GroupCommentCardList = ({groupsId, id}: GroupCommentCardListProps) => {
  const {isFetching, data, commentCount} = useFetchGetCommendList(id);
  if (isFetching) {
    return <LoadingPageSpinner />;
  }
  if (!data?.length) {
    return (
      <StyledFallbackContainer>
        <Text>아직 댓글이 없습니다.</Text>
      </StyledFallbackContainer>
    );
  }

  return (
    <StyledContainer>
      <HeaderTitle>
        <Heading>{commentCount ? `댓글 ${commentCount}개` : '댓글'}</Heading>
      </HeaderTitle>
      {data &&
        data.map((parentComment, index) => (
          <Fragment key={`${index}--`}>
            <GroupCommentCard groupsId={groupsId} articleId={id} {...parentComment.parent} />
            {parentComment.child.map((childComment, id) => (
              <GroupCommentCard groupsId={groupsId} articleId={id} {...childComment} />
            ))}
          </Fragment>
        ))}
    </StyledContainer>
  );
};

const StyledFallbackContainer = styled.View`
  height: 120px;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.View`
  gap: 4px;
  padding-bottom: 60px;
`;

const HeaderTitle = styled.View`
  padding: 14px 20px;
`;

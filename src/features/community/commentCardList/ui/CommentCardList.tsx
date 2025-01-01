import {Fragment} from 'react';
import styled from 'styled-components/native';
import {useFetchGetCommendList} from '../model/useFetchGetCommendList.tsx';
import {CommentCard} from '~/entities/community/commentCard';
import {Heading, Text} from '@gluestack-ui/themed';
import {LoadingPageSpinner} from '~/shared/ui';
import {setReplyComment} from '~/features/community/commentWriteForm';
import {useGroupArticlePermissionStore} from '~/features/groups/groupArticleContents';

export const CommentCardList = () => {
  const {userId: articleUserId} = useGroupArticlePermissionStore();
  const {isError, isFetching, data, commentCount} = useFetchGetCommendList();
  if (isError) {
    return <Text>에러 발생</Text>;
  }

  return (
    <StyledContainer>
      <HeaderTitle>
        <Heading>{commentCount ? `댓글 ${commentCount}개` : '댓글'}</Heading>
      </HeaderTitle>
      {data &&
        data.map((parentComment, index) => (
          <Fragment key={`${index}--`}>
            <CommentCard
              {...parentComment.parent}
              isSuccessFetchLike={true} // type error 피하기 위한 임시 작성
              articleUserId={articleUserId}
              onReplyComment={() => setReplyComment(parentComment.parent)}
            />
            {parentComment.child.map((childComment, id) => (
              <CommentCard
                {...childComment}
                isSuccessFetchLike={true} // type error 피하기 위한 임시 작성
                articleUserId={articleUserId}
                key={`${id}-${childComment.createDate}`}
                onReplyComment={() => setReplyComment(childComment)}
              />
            ))}
          </Fragment>
        ))}
      {isFetching && <LoadingPageSpinner />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 4px;
  padding-bottom: 60px;
`;

const HeaderTitle = styled.View`
  padding: 14px 20px;
`;

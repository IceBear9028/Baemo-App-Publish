import styled from 'styled-components/native';
import {Comment} from '~/shared/mapper/community';
import {ArticleCommentsButton, ProfileInfoCard} from '~/shared/ui';
import {Text} from '@gluestack-ui/themed';
import {DetailArticlePermission} from '~/shared/mapper/community';
import {CommentOwnerMenu} from '~/entities/community/commentCard/ui/CommentOwnerMenu.tsx';
import {CommentReaderMenu} from '~/entities/community/commentCard/ui/CommentReaderMenu.tsx';
import {useMyProfileStore} from '~/shared/authentication';
import {formatTimeDifference} from '~/shared/utils';
import {CommentLikeButton} from '~/entities/community/commentCard/ui/CommentLikeButton.tsx';

export interface CommentCardProps extends Comment {
  onReplyComment?: () => void; // 댓글언급 기능
  onDelComment?: () => void; // 댓글삭제 기능
  onEditComment?: () => void; // 댓글수정 기능
  onLikeComment?: () => void; // 댓글 좋아요
  permission?: keyof DetailArticlePermission;
  isSuccessFetchLike: boolean;
  articleUserId: number;
}

export const CommentCard = (props: CommentCardProps) => {
  const myUserId = useMyProfileStore(store => store.userId);

  const isReplyComment = typeof props.reply === 'number';
  const diffTime = formatTimeDifference(props.createDate);
  const authorText = props?.articleUserId === props?.commentUser.userId ? '글 작성자' : '';

  function likeButtonClick() {
    props.onLikeComment && props.onLikeComment();
  }

  return (
    <StyledContainer isReply={isReplyComment}>
      <ProfileInfoCard {...props.commentUser} avatarSize={'xs'} badge={authorText} description={diffTime}>
        {myUserId === props.commentUser.userId ? (
          <CommentOwnerMenu commentUser={props.commentUser} onDelComment={props.onDelComment} onEditComment={props.onEditComment} />
        ) : (
          <CommentReaderMenu commentUser={props.commentUser} />
        )}
      </ProfileInfoCard>
      <StyledContentsContainer>
        <Text size={'sm'} color={'$textLight950'}>
          {props.content}
        </Text>
        <StyledStatusInputGroups>
          <CommentLikeButton
            likeCountPrev={props.likes}
            isLikePrev={props.isLikedByUser}
            isFetchSuccess={props.isSuccessFetchLike}
            onPress={likeButtonClick}
          />
          {!props.reply && <ArticleCommentsButton isShowText={true} onPress={props.onReplyComment} />}
        </StyledStatusInputGroups>
      </StyledContentsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{isReply: boolean}>`
  padding: ${({isReply}) => (isReply ? '10px 20px 10px 61px;' : '10px 20px;')};
  gap: 8px;
`;

const StyledContentsContainer = styled.View`
  gap: 14px;
`;

const StyledStatusInputGroups = styled.View`
  flex-direction: row;
  gap: 16px;
`;

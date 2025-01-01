import {Comment} from '~/shared/mapper/community';
import {useFetchLikeGroupComment} from '../model/useFetchLikeGroupComment.ts';
import {useGroupArticlePermissionStore} from '~/features/groups/groupArticleContents';
import {useFetchDeleteComment} from '~/features/groups/groupCommentCardList/model/useFetchDeleteComment.ts';
import {CommentCard} from '~/entities/community/commentCard';
import {setReplyGroupComment, useGroupCommentStore} from '~/features/groups/groupCommentWriteForm';

interface GroupCommentCardProps extends Comment {
  groupsId: number;
  articleId: number;
}

export const GroupCommentCard = ({articleId, ...comment}: GroupCommentCardProps) => {
  const {fetchDeleteComment} = useFetchDeleteComment(articleId);
  const {isSuccess, commentLike} = useFetchLikeGroupComment(articleId, comment.commentId);
  const articleAuthorId = useGroupArticlePermissionStore(store => store.userId);
  const initEditContent = useGroupCommentStore(store => store.initEditContent);

  return (
    <CommentCard
      {...comment}
      articleUserId={articleAuthorId}
      isSuccessFetchLike={isSuccess}
      onEditComment={() => initEditContent(comment.commentId, comment.content)}
      onReplyComment={() => setReplyGroupComment(comment)}
      onDelComment={() => fetchDeleteComment(comment.commentId)}
      onLikeComment={() => commentLike()}
    />
  );
};

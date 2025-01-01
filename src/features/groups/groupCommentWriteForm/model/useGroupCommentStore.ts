import {create} from 'zustand';
import {Comment} from '~/shared/mapper/community';
import {ReqPostComment} from '../api/fetchPostGroupComment.ts';
import {ReqEditComment} from '../api/fetchEditGroupComment.ts';

interface CommentStatus {
  content: string;
  replyInfo: null | Comment;
  editCommentId: null | number;
}

interface ActionStore {
  setContent: (input: string) => void;
  initEditContent: (commentId: number, comment: string) => void;
  resetContent: () => void;
  getRequestComment: (postId: number) => ReqPostComment;
  getRequestEditComment: (postId: number) => ReqEditComment;
}

export const useGroupCommentStore = create<CommentStatus & ActionStore>((set, get) => ({
  content: '',
  replyInfo: null,
  editCommentId: null,
  initEditContent: (commentId, content) => set(prev => ({...prev, content: content, editCommentId: commentId})),
  resetContent: () => set(prev => ({...prev, content: '', replyInfo: null, editCommentId: null})),
  setContent: (input: string) => set(prev => ({...prev, content: input})),
  getRequestComment: postId => {
    const {content, replyInfo} = get();
    return {
      postId,
      depth: replyInfo ? 2 : 1,
      preCommentId: replyInfo ? replyInfo.commentId : null,
      commentContent: content,
    };
  },
  getRequestEditComment: postId => {
    const {content, editCommentId} = get();
    return {
      postId: postId,
      commentId: editCommentId as number,
      newCommentContent: content,
    };
  },
}));

/** #### useSetReplyComment
 * #### 용도
 * - commentList 에서, 특정 댓글에 대댓글을 달 경우, 부모 댓글에 대한 정보를 저장한다.
 */
export const setReplyGroupComment = (input: Comment) => useGroupCommentStore.setState(state => ({...state, replyInfo: input}));

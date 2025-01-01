import {create} from 'zustand';
import {Comment} from '~/shared/mapper/community';
import {PostCommentReq} from '~/features/community/commentWriteForm/api/fetchPostComment.ts';

interface CommentStatus extends PostCommentReq {
  replyInfo: null | Comment;
}

interface ActionStore {
  setContent: (input: string) => void;
  getRequestComment: () => PostCommentReq;
}

export const useCommentStore = create<CommentStatus & ActionStore>((set, get) => ({
  title: '',
  content: '',
  category: '',
  imageList: [],
  replyInfo: null,
  setContent: (input: string) => set(prev => ({...prev, content: input})),
  getRequestComment: () => {
    const {title, content, category, imageList} = get();
    return {title, content, category, imageList};
  },
}));

/** #### useSetReplyComment
 * #### 용도
 * - commentList 에서, 특정 댓글에 대댓글을 달 경우, 부모 댓글에 대한 정보를 저장한다.
 */
export const setReplyComment = (input: Comment) => useCommentStore.setState(state => ({...state, replyInfo: input}));

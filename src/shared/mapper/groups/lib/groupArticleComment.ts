import {Comment, CommentItemResponse} from '~/shared/mapper/community';

export interface GroupArticleCommentResponse {
  // 유저 프로필 정보
  writerId: number;
  writerName: string;
  writerThumbnail: string;

  // 댓글 ID
  commentId: number;
  // 대댓글 ID
  preCommentId: number;
  // 대댓글의 DEPTH
  depth: number;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isLikedByUser: true;
}

export class GroupArticleComment extends Comment {
  constructor(input: GroupArticleCommentResponse) {
    const convert: CommentItemResponse = {
      id: input.commentId,
      content: input.content,
      likes: input.likeCount,
      reply: input.preCommentId, // API 업데이트 시 필요
      isLikedByUser: input.isLikedByUser,
      userProfile: {
        userId: input.writerId,
        name: input.writerName,
        profileImage: input.writerThumbnail,
      },
      createDate: input.createdAt,
      editDate: input.updatedAt,
    };
    super(convert);
  }
}

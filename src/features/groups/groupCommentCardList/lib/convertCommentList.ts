import {Comment} from '~/shared/mapper/community';

export type ParentChildComment = {
  parent: Comment;
  child: Comment[];
};

// String => Date 변환 함수
const parseDateString = (dateString: string): Date => {
  return new Date(dateString);
};

export function convertCommentList(comments: Comment[]): ParentChildComment[] {
  // A. 전체 댓글리스트를 부모/자식 관계를 Mapping 하기 위한 객체
  const commentMap = new Map<string, ParentChildComment>();

  comments.forEach(comment => {
    if (comment.reply === null) {
      // 1. null 인 경우 -> 부모 댓글인 경우
      const parentComment = commentMap.get(String(comment.commentId));
      // 1-1. comment.reply !== null 조건문에서 미리 comment 를 추가했던 경우
      if (parentComment) {
        commentMap.set(String(comment.commentId), {parent: comment, child: parentComment.child});
      } else {
        commentMap.set(String(comment.commentId), {parent: comment, child: []});
      }
    } else {
      // 2. null 이 아닌 경우 -> 자식 댓글인 경우
      const parentComment = commentMap.get(comment.reply.toString());
      if (parentComment) {
        commentMap.set(String(comment.reply), {...parentComment, child: [...parentComment.child, comment]});
      } else {
        // 부모 댓글이 아직 commentMap 에 없는 경우
        commentMap.set(String(comment.reply), {parent: {} as Comment, child: [comment]});
      }
    }
  });

  // B. Mapping 한 객체를 Array 로 변환
  const result: ParentChildComment[] = Array.from(commentMap.values());

  // 자식 Comment 를 내림차순으로 정렬
  result.forEach(pc => {
    // Sort child comments by createDate in descending order
    pc.child.sort((a, b) => parseDateString(b.createDate).getTime() - parseDateString(a.createDate).getTime());
  });

  // 부모 Comment 를 내림차순으로 정렬
  result.sort((a, b) => parseDateString(b.parent.createDate).getTime() - parseDateString(a.parent.createDate).getTime());

  return result;
}

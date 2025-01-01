import {ParentChildComment} from './convertCommentList.ts';

// 전체 Comment 개수를 측정하는 함수
export function countTotalComments(transformedComments: ParentChildComment[]): number {
  let totalCount = 0;

  transformedComments.forEach(item => {
    totalCount += 1; // 부모 댓글
    totalCount += item.child.length; // 자식 댓글
  });

  return totalCount;
}

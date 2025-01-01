/** 1. interface, type 관리
 */
export type {GroupMembersResponse} from '~/shared/mapper/groups/lib/groupMembers.ts';
export type {GroupsResponse, GroupsItemResponse} from './lib/groups';
export type {GroupRoleKeys, GroupRoleResponse, GroupsIntroResponse} from './lib/groupsIntroduction';
export type {GroupsResponse_TEMP} from './lib/groups';
export type {GroupApplicantResponse} from './lib/groupApplicant';
export type {GroupArticleImageResponse, GroupDetailArticleResponse} from './lib/groupDetailArticle';
export type {GroupArticleCommentResponse} from './lib/groupArticleComment';
export type {
  GroupArticleType,
  GroupArticleResponseType,
  GroupArticleNormalResponse,
  GroupArticleNoticeResponse,
} from './lib/groupArticle.ts';

/** 2. Class 관리
 */
export {Groups} from './lib/groups';
export {GroupApplicant} from './lib/groupApplicant';
export {GroupMember, GroupMemberStatus} from '~/shared/mapper/groups/lib/groupMembers.ts';
export {GroupRole, GroupsIntro} from './lib/groupsIntroduction';
export {Groups_TEMP, GroupsList_TEMP} from './lib/groups';
export {GroupDetailArticle} from './lib/groupDetailArticle';
export {GroupArticleComment} from './lib/groupArticleComment';
export {GroupArticle, GroupArticleNotice, ArticleGroupStatus} from './lib/groupArticle.ts';

// import {Article, ArticleCommunityStatus, ArticleGroupStatus} from '~/shared/mapper/community/lib/article.ts';
import {Badge, BadgeText} from '@gluestack-ui/themed';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {Article, ArticleCommunityStatus, ServiceNoticeArticleStatus} from '~/shared/mapper/community';

interface ArticleStatusBadgeProps extends Pick<Article, 'status'> {}

const badgeOption = {
  ...new ArticleGroupStatus(),
  ...new ArticleCommunityStatus(),
  ...new ServiceNoticeArticleStatus(),
};

export const ArticleStatusBadge = (props: ArticleStatusBadgeProps) => {
  return (
    <Badge action={'muted'}>
      <BadgeText>{badgeOption[props.status]}</BadgeText>
    </Badge>
  );
};

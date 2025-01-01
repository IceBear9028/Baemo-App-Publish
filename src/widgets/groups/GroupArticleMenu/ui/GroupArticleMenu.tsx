import {Groups} from '~/shared/mapper/groups';
import {GroupArticle} from '~/shared/mapper/groups';
import {AuthorMenu} from '~/widgets/groups/GroupArticleMenu/ui/AuthorMenu.tsx';
import {ReaderMenu} from '~/widgets/groups/GroupArticleMenu/ui/ReaderMenu.tsx';
import {useGroupArticlePermissionStore} from '~/features/groups/groupArticleContents';

export interface GroupArticleMenuProps extends Pick<Groups, 'groupsId'>, Pick<GroupArticle, 'id'> {}

export const GroupArticleMenu = (props: GroupArticleMenuProps) => {
  const permission = useGroupArticlePermissionStore(store => store.permission);
  switch (permission) {
    case 'AUTHOR':
      return <AuthorMenu {...props} />;
    default:
      return <ReaderMenu {...props} />;
  }
};

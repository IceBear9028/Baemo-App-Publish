import {Fragment} from 'react';
import {AuthorMenu} from '../ui/AuthorMenu.tsx';
import {useServiceNoticeRole} from '~/widgets/serviceNotice/serviceNoticeList';
import {ServiceNoticeArticle} from '~/shared/mapper/community';

export interface ServiceNoticeArticleMenuProps extends Pick<ServiceNoticeArticle, 'id'> {}

export const ServiceNoticeArticleMenu = (props: ServiceNoticeArticleMenuProps) => {
  const {role} = useServiceNoticeRole();
  switch (role) {
    case 'BAEMO_ADMIN':
      return <AuthorMenu {...props} />;
    default:
      return <Fragment />;
  }
};

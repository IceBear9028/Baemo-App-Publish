import {useEffect, useState} from 'react';
import {useArticleTextStore} from '../model/useArtcleTextStore.ts';
import {useArticleTitleStore} from '../model/useArticleTitleStore.ts';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';

export function useValidateArticle() {
  const text = useArticleTextStore(store => store.text);
  const title = useArticleTitleStore(store => store.title);
  const articleStatus = useArticleStatusStore(store => store.groupArticleStatus);

  const [isEmptyText, setEmptyText] = useState<boolean>(!!text);
  const [isEmptyTitle, setEmptyTitle] = useState<boolean>(!!title);
  const [isArticleVal, setArticleVal] = useState<boolean>(!!title && !!text && !!articleStatus);

  useEffect(() => {
    setEmptyText(() => !!text);
    setEmptyTitle(() => !!title);
    setArticleVal(() => !!title && !!text && !!articleStatus);
  }, [text, title, articleStatus]);

  return {
    isEmptyText,
    isEmptyTitle,
    isArticleVal,
  };
}

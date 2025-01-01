import {useEffect, useState} from 'react';
import {useArticleTextStore} from './useArtcleTextStore.ts';
import {useArticleTitleStore} from './useArticleTitleStore.ts';

export function useValidateArticle() {
  const text = useArticleTextStore(store => store.text);
  const title = useArticleTitleStore(store => store.title);

  const [isEmptyText, setEmptyText] = useState<boolean>(!!text);
  const [isEmptyTitle, setEmptyTitle] = useState<boolean>(!!title);

  useEffect(() => {
    setEmptyText(() => !!text);
    setEmptyTitle(() => !!title);
  }, [text, title]);

  return {
    isEmptyText,
    isEmptyTitle,
  };
}

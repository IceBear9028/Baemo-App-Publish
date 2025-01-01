import {useState} from 'react';

export function useSearchQueryState() {
  const [queryKeyword, setKeyword] = useState<string>('');

  function setQueryKeyword(input: string) {
    setKeyword(() => input);
  }

  return {queryKeyword, setQueryKeyword};
}

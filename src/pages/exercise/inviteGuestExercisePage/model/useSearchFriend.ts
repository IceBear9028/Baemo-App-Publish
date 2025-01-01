import {useState} from 'react';

export function useSearchFriend() {
  const [searchQuery, setSearchQuery] = useState('');
  return {
    searchQuery,
    setSearchQuery,
  };
}

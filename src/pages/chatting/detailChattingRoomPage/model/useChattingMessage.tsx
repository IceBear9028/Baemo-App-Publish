import {useQuery} from '@tanstack/react-query';
import {fetchChattingMessage} from '../api/fetchChattingMessage';
import {useEffect, useState} from 'react';
import {UserMessage} from '~/shared/mapper/chatting';

export function useChattingMessages(chatRoomId: string) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['fetchChattingMessage', chatRoomId],
    queryFn: () => fetchChattingMessage(chatRoomId),
  });

  return {
    isLoading,
    isError,
    data,
  };
}
//캐싱에 대해서 options고민....
// staleTime: 1000 * 60 * 5,
// cacheTime: 1000 * 60 * 10,

// return useQuery({
//   queryKey: ['chatMessages', chatRoomId],
//   queryFn: () => fetchChattingMessage(chatRoomId),
//   onError: (error: Error) => {
//     console.error('Error fetching chat messages:', error);
//   },
// });

/***
  const [displayedMessages, setDisplayedMessages] = useState<{messages:UserMessage}>([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (data && data.messages) {
      const newMessages = data.messages.slice(offset, offset + limit);
      setDisplayedMessages(prevMessages => [...newMessages, ...prevMessages]);
    }
  }, [data, offset]);

  const loadMoreMessage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  return {
    isLoading,
    isError,
    data: displayedMessages,
    loadMoreMessage,
  };
  return {
    isLoading,
    isError,
    data,
  };
 ***/

import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {fetchPostSearchFriend, ReqSearchFriend} from '../api/fetchPostSearchFriend.ts';

export interface searchFriendDto {
  userCode: string;
}

export function useFetchPostSearchFriend() {
  const [result, setResult] = useState<any>();
  const {isPending, mutate, isError} = useMutation({
    mutationFn: fetchPostSearchFriend,
    onSuccess: data => {
      console.log('post성공', data);
      setResult(data.payload);
    },
    onError: error => {
      if (error.response?.data.payload) {
        console.log('post실패');
      } else {
        console.log('서버에 문제생김');
      }
    },
  });
  function postSearchFriend({userCode}: searchFriendDto) {
    const createDto: ReqSearchFriend = {
      userCode,
    };
    mutate(createDto);
  }

  function resetResult() {
    setResult(null);
  }

  return {
    isPending,
    postSearchFriend,
    result,
    isError,
    resetResult,
  };
}

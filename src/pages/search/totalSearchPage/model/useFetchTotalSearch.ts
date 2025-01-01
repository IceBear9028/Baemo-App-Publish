import {useMutation} from '@tanstack/react-query';
import {fetchPostTotalSearch} from '~/pages/search/totalSearchPage/api/fetchPostTotalSearch.ts';
import {Alert} from 'react-native';

export function useFetchTotalSearch() {
  const {isPending, mutate, data} = useMutation({
    mutationFn: fetchPostTotalSearch,
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('모임운동 실패', error.response.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('모임운동 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
    throwOnError: true,
  });

  function totalSearch(param: string) {
    if (param.length < 2 || param.length > 10) {
      Alert.alert('검색', '검색은 최소 2글자, 최대 10글자로 검색해주세요.', [{text: '확인'}]);
    } else {
      mutate({query: param});
    }
  }

  return {
    isPending,
    totalSearch,
    searchResult: data,
  };
}

import React from 'react';
import styled from 'styled-components/native';
import {useSearchQueryState} from '../model/useSearchQueryState.ts';
import {useFetchTotalSearch} from '~/pages/search/totalSearchPage/model/useFetchTotalSearch.ts';
import {ExerciseList} from '~/pages/search/totalSearchPage/ui/ExerciseList.tsx';
import {ApiErrorBoundary} from '~/shared/error/apiErrorBoundary';
import {GroupList} from '~/pages/search/totalSearchPage/ui/GroupList.tsx';
import {ActivityIndicator} from 'react-native';

export const TotalSearchPage = () => {
  return (
    <ApiErrorBoundary>
      <SearchResult />
    </ApiErrorBoundary>
  );
};

const SearchResult = () => {
  const {queryKeyword, setQueryKeyword} = useSearchQueryState();
  const {isPending, searchResult, totalSearch} = useFetchTotalSearch();
  return (
    <StyledContainer>
      <StyledSearchContainer>
        <SearchInput
          placeholder="검색"
          placeholderTextColor="#A3A3A3"
          onChangeText={text => setQueryKeyword(text)}
          onSubmitEditing={() => totalSearch(queryKeyword)}
        />
      </StyledSearchContainer>
      <StyledBodyContainer>
        <StyledScroll>
          {isPending && (
            <StyledFallback>
              <ActivityIndicator />
            </StyledFallback>
          )}
          {searchResult && <GroupList list={searchResult.groups} />}
          {searchResult && <ExerciseList list={searchResult.exercises} />}
        </StyledScroll>
      </StyledBodyContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledBodyContainer = styled.View`
  flex: 1;
`;

const StyledScroll = styled.ScrollView``;

const StyledFallback = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledSearchContainer = styled.View`
  gap: 32px;
  padding: 16px 20px;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-radius: 4px;
  padding-left: 10px;
  background-color: #f5f5f5;
`;

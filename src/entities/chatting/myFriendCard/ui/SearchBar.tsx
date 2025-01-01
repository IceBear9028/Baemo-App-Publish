import styled from 'styled-components/native';

interface SearchBarProps {
  search: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({search, onChangeText}: SearchBarProps) => {
  return <SearchInput placeholder="검색" placeholderTextColor="#A3A3A3" value={search} onChangeText={onChangeText} />;
};

const SearchInput = styled.TextInput`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
`;

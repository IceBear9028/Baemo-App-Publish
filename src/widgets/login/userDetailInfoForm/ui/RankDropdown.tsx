import {Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {Fragment, useState} from 'react';
import DropdownIcon from '~/shared/images/svg/dropdown.svg';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

const RANK_OPTIONS = [
  {value: 'S', text: 'S조(자강)'},
  {value: 'A', text: 'A조'},
  {value: 'B', text: 'B조'},
  {value: 'C', text: 'C조'},
  {value: 'D', text: 'D조'},
  {value: 'E', text: 'E조(초심)'},
  {value: 'N', text: 'N조(입문)'},
] as const;

export const RankDropdown = () => {
  const setLevel = useSignUpUserInfoStore(store => store.setLevel);
  const [rank, setRank] = useState<string>('선택하세요');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: (typeof RANK_OPTIONS)[number]['value'], text: string) => {
    setRank(text);
    setLevel(value);
    setIsOpen(false);
  };

  return (
    <StyledContainer>
      <Text color="$textLight700" lineHeight="$xs" size="sm">
        급수
      </Text>
      <DropDownHeader onPress={onToggle}>
        <Text>{rank}</Text>
        <DropdownIcon width={16} height={16} />
      </DropDownHeader>
      {isOpen && (
        <DropDownContainer>
          {RANK_OPTIONS.map(option => (
            <ListItem key={option.value} onPress={() => onOptionClicked(option.value, option.text)}>
              <Text>{option.text}</Text>
            </ListItem>
          ))}
        </DropDownContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  margin-bottom: 10px;
`;

const DropDownHeader = styled.TouchableOpacity`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #d4d4d4;
`;

const DropDownContainer = styled.View`
  margin-top: 5px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #d4d4d4;
`;

const ListItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #d4d4d4;
  background-color: #fff;
  &:last-child {
    border-bottom-width: 0;
  }
`;

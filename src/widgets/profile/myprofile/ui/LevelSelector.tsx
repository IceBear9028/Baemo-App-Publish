import styled from 'styled-components/native';
import {MyLevelResponse} from '~/shared/mapper/userProfile';
import {Fragment, useState} from 'react';
import {VStack, Text} from '@gluestack-ui/themed';
import DropdownIcon from '~/shared/images/svg/dropdown.svg';

const RANK_OPTIONS: {value: MyLevelResponse; text: string}[] = [
  {value: 'S', text: 'S조(자강)'},
  {value: 'A', text: 'A조'},
  {value: 'B', text: 'B조'},
  {value: 'C', text: 'C조'},
  {value: 'D', text: 'D조'},
  {value: 'E', text: 'E조(초심)'},
  {value: 'N', text: 'N조(입문)'},
];

interface LevelSelectorProps {
  title: string;
  level: MyLevelResponse;
  onChange: (level: MyLevelResponse) => void;
}

export const LevelSelector = ({title, level, onChange}: LevelSelectorProps) => {
  const [rank, setRank] = useState<string>(`${level}조`);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: MyLevelResponse, text: string) => () => {
    setRank(text);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <VStack space="xs">
      <Text color="$textLight800" lineHeight="$xs" size="sm">
        {title}
      </Text>
      <DropDownHeader onPress={onToggle}>
        <Text>{rank}</Text>
        <DropdownIcon width={16} height={16} />
      </DropDownHeader>
      {isOpen && (
        <DropDownContainer>
          {RANK_OPTIONS.map(option => (
            <ListItem key={option.value} onPress={onOptionClicked(option.value, option.text)}>
              <Text>{option.text}</Text>
            </ListItem>
          ))}
        </DropDownContainer>
      )}
    </VStack>
  );
};

const DropDownHeader = styled.TouchableOpacity`
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
  border-width: 1px;
  border-color: #d4d4d4;
  border-radius: 5px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #d4d4d4;
  &:last-child {
    border-bottom-width: 0;
  }
`;

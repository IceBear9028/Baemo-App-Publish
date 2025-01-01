import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, HStack, Text} from '@gluestack-ui/themed';
import styled from 'styled-components/native';

interface FilterMyGameProps {
  isMyGame: boolean;
  filterMyGame: () => void;
}

export const MyGameFilter = (props: FilterMyGameProps) => {
  return (
    <StyledContainer>
      <HStack space="md" alignItems="center">
        <Checkbox size="md" isChecked={props.isMyGame} onChange={props.filterMyGame} value={'myGame'}>
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel size={'sm'}>내 게임</CheckboxLabel>
        </Checkbox>
      </HStack>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 14px 20px 14px 0;
  z-index: 10;
  justify-content: center;
`;

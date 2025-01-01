import styled from 'styled-components/native';
import {Fragment, useEffect, useState} from 'react';
import {useFetchGetReasons} from '../model/useFetchGetReasons.ts';
import {Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, Text, VStack} from '@gluestack-ui/themed';

interface ArticleReasonListProps {
  onChange: (input: string[]) => void;
}

export const UserReasonList = ({onChange}: ArticleReasonListProps) => {
  const {data} = useFetchGetReasons();
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <Fragment>
      {data && (
        <StyledContainer>
          <Text size={'md'} bold={true}>
            사유 선택
          </Text>
          <CheckboxGroup
            value={values}
            onChange={keys => {
              setValues(keys);
            }}>
            <VStack space="xl">
              <StyledCheckContainer>
                {data.map(reasonItem => (
                  <Checkbox key={reasonItem.reason} value={reasonItem.reason} aria-label="Search">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <StyledSpace />
                    <CheckboxLabel>{reasonItem.description}</CheckboxLabel>
                  </Checkbox>
                ))}
              </StyledCheckContainer>
            </VStack>
          </CheckboxGroup>
        </StyledContainer>
      )}
    </Fragment>
  );
};

const StyledContainer = styled.View`
  gap: 12px;
`;

const StyledSpace = styled.View`
  width: 8px;
`;

const StyledCheckContainer = styled.View`
  padding-right: 20px;
  gap: 16px;
`;

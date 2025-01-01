import {useFetchGetReasons} from '~/pages/report/reportArticlePage/model/useFetchGetReasons.ts';
import {Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, Text, VStack} from '@gluestack-ui/themed';
import {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components/native';

interface ArticleReasonListProps {
  onChange: (input: string[]) => void;
}

export const ArticleReasonList = ({onChange}: ArticleReasonListProps) => {
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
              {data.map(reasonItem => (
                <Checkbox key={reasonItem.reason} value={reasonItem.reason} aria-label="Search">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <StyledSpace />
                  <CheckboxLabel>{reasonItem.description}</CheckboxLabel>
                </Checkbox>
              ))}
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

import React from 'react';
import styled from 'styled-components/native';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {CircleIcon, FormControl, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack} from '@gluestack-ui/themed';

export const InputGenderForm = () => {
  const {gender, setGender} = useSignUpUserInfoStore(store => ({
    gender: store.store.gender,
    setGender: store.setGender,
  }));
  return (
    <FormControl>
      <VStack space="xs">
        <Text color="$textLight700" size="sm">
          성별
        </Text>
        <RadioGroup value={gender} onChange={setGender}>
          <VStack space="md">
            <Radio value="M" size="lg">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>남자</RadioLabel>
            </Radio>
            <Radio value="F" size="lg">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>여자</RadioLabel>
            </Radio>
            {/*<Radio value="X" size="lg">*/}
            {/*  <RadioIndicator mr="$2">*/}
            {/*    <RadioIcon as={CircleIcon} />*/}
            {/*  </RadioIndicator>*/}
            {/*  <RadioLabel>(선택하지 않음)</RadioLabel>*/}
            {/*</Radio>*/}
          </VStack>
        </RadioGroup>
      </VStack>
    </FormControl>
  );
};

const StyledHStack = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledRadioContainer = styled.View`
  width: 50%;
`;

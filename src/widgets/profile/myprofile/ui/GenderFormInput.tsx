import {CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';

interface GenderFormInputProps {
  title: string;
  value: string;
  onChange: (input: any) => void;
}

export const GenderFormInput = ({title, value, onChange}: GenderFormInputProps) => {
  return (
    <VStack space="xs">
      <Text color="$text700" size="sm">
        {title}
      </Text>
      <RadioGroup value={value} onChange={onChange}>
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
        </VStack>
      </RadioGroup>
    </VStack>
  );
};

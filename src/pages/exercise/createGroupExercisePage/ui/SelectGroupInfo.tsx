import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import React from 'react';
import {Groups} from '~/shared/mapper/groups';

interface SelectGroupInfoProps extends Pick<Groups, 'groupsId' | 'groupsName'> {}

export const SelectGroupInfo = ({groupsName}: SelectGroupInfoProps) => {
  return (
    <StyledContainer>
      <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
        모임 정보
      </Text>
      <Badge action={'success'}>
        <BadgeText>{groupsName}</BadgeText>
      </Badge>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 4px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;
